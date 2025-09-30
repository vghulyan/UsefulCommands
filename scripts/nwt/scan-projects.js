// scan-projects.js
const fs = require("fs");
const path = require("path");

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

const root = process.cwd();

// 1) read nx.json (top-level) & show its "projects" map (if any)
let nxJson = {};
try {
  nxJson = readJson(path.join(root, "nx.json"));
} catch (e) {}
const nxProjects = nxJson.projects || {};
console.log("[scan] nx.json projects keys:", Object.keys(nxProjects));

// 2) find all project.json under packages/*
const pkgsDir = path.join(root, "packages");
const found = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      const pj = path.join(p, "project.json");
      if (fs.existsSync(pj)) found.push(pj);
      // only descend one level under packages/*
      // comment out next line if your structure is deeper
      continue;
    }
  }
}

if (fs.existsSync(pkgsDir)) {
  walk(pkgsDir);
}
console.log(
  "[scan] project.json files:",
  found.map((p) => path.relative(root, p))
);

// 3) validate each project.json
for (const pj of found) {
  const rel = path.relative(root, pj);
  try {
    const j = readJson(pj);
    const issues = [];
    if (!j.name) issues.push('missing "name"');
    if (!j.root) issues.push('missing "root"');
    if (!j.sourceRoot) issues.push('missing "sourceRoot"');
    // expected root from the path
    const expectedRoot = path.dirname(rel).replace(/\\/g, "/");
    if (j.root && j.root !== expectedRoot) {
      issues.push(
        `root mismatch (json: ${j.root} vs expected: ${expectedRoot})`
      );
    }
    console.log(
      `[scan] ${rel} -> name=${j.name} root=${j.root} sourceRoot=${
        j.sourceRoot
      } targets=${j.targets ? Object.keys(j.targets).join(",") : "(none)"}`
    );
    if (issues.length) console.warn("       ⚠", issues.join("; "));
    // check nx.json projects entry exists & matches
    const nxEntry = nxProjects[j.name];
    if (!nxEntry) {
      console.warn(`       ⚠ nx.json is missing projects["${j.name}"]`);
    } else {
      const nxRoot = typeof nxEntry === "string" ? nxEntry : nxEntry.root;
      if (nxRoot !== expectedRoot) {
        console.warn(
          `       ⚠ nx.json projects["${j.name}"].root mismatch (${nxRoot} vs ${expectedRoot})`
        );
      }
    }
  } catch (e) {
    console.error(`[scan] ${rel} -> JSON ERROR:`, e.message);
  }
}
