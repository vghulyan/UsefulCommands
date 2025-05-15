const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { exec } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "📁 Enter path to the project folder (default: current folder): ",
  (inputPath) => {
    const projectRoot = inputPath.trim() || ".";

    rl.question(
      "📝 Enter output HTML filename (default: component-usage-report.html): ",
      (outputFile) => {
        const outputHtml = outputFile.trim() || "component-usage-report.html";
        const componentFolder = path.join(projectRoot, "src", "components");

        const componentRegex = /<([a-zA-Z0-9_:.-]+)\b/g;
        const propsRegex = /<([a-zA-Z0-9_:.-]+)\s+([^>/]+?)(?:\/?>)/gs;

        const usageMap = {};
        const propsMap = {};
        const declaredComponents = new Set();

        function walk(dir, callback) {
          const files = fs.readdirSync(dir);
          for (const file of files) {
            const full = path.join(dir, file);
            const stat = fs.statSync(full);
            if (stat.isDirectory()) {
              walk(full, callback);
            } else if (/(\.js|\.jsx|\.ts|\.tsx)$/.test(path.extname(file))) {
              callback(full);
            }
          }
        }

        function parseFile(filePath) {
          const relPath = path.relative(projectRoot, filePath);
          const content = fs.readFileSync(filePath, "utf-8");

          const components = content.matchAll(componentRegex);
          for (const match of components) {
            const name = match[1];
            if (!usageMap[name]) usageMap[name] = {};
            usageMap[name][relPath] = (usageMap[name][relPath] || 0) + 1;
          }

          const propsMatches = content.matchAll(propsRegex);
          for (const match of propsMatches) {
            const name = match[1];
            const propsRaw = match[2];
            const propsFound = Array.from(propsRaw.matchAll(/(\w+)=/g)).map(
              (m) => m[1]
            );

            if (!propsMap[name]) propsMap[name] = {};
            if (!propsMap[name][relPath]) propsMap[name][relPath] = new Set();
            propsFound.forEach((p) => propsMap[name][relPath].add(p));
          }
        }

        if (fs.existsSync(componentFolder)) {
          walk(componentFolder, (filePath) => {
            const base = path.basename(filePath);
            const name = base.split(".")[0];
            declaredComponents.add(name);
          });
        }

        walk(projectRoot, parseFile);

        function generateReport() {
          let html = `
      <html><head><title>Component Usage Report</title>
      <style>
        body { font-family: sans-serif; padding: 20px; }
        input, select, button { margin: 10px 5px; padding: 6px; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
        th { background: #eee; cursor: pointer; }
        .highlight { background-color: #ffeeba; }
      </style>
      </head><body>
      <h1>Component Usage Report</h1>
      <label>🔍 Search Component: <input type="text" id="componentSearch" placeholder="e.g. Button" /></label>
      <label>📂 Filter by File: <select id="fileFilter"><option value="">-- All Files --</option>\`;

      const allFiles = new Set();
      Object.values(usageMap).forEach(files => Object.keys(files).forEach(f => allFiles.add(f)));
      Array.from(allFiles).sort().forEach(f => {
        html += \`<option value="\${f}">\${f}</option>\`;
      });

      html += \`</select></label> <button onclick="exportCSV()">⬇ Export CSV</button>\`;

      html += \`<table id="usageTable">
        <thead><tr><th onclick="sortTable(0)">Component</th><th onclick="sortTable(1)">File</th><th onclick="sortTable(2)">Count</th><th onclick="sortTable(3)">Total</th></tr></thead><tbody>\`;

      Object.entries(usageMap).forEach(([component, files]) => {
        const total = Object.values(files).reduce((a, b) => a + b, 0);
        Object.entries(files).forEach(([file, count]) => {
          html += \`<tr data-comp="\${component}" data-file="\${file}" class="\${total > 5 ? 'highlight' : ''}">
            <td>\${component}</td><td>\${file}</td><td>\${count}</td><td>\${total}</td>
          </tr>\`;
        });
      });

      html += \`</tbody></table><h2>Props Used</h2><table><thead><tr><th>Component</th><th>File</th><th>Props</th></tr></thead><tbody>\`;

      Object.entries(propsMap).forEach(([component, files]) => {
        Object.entries(files).forEach(([file, propsSet]) => {
          html += \`<tr><td>\${component}</td><td>\${file}</td><td>\${Array.from(propsSet).join(", ")}</td></tr>\`;
        });
      });

      html += \`</tbody></table>\`;

      const usedComponents = new Set(Object.keys(usageMap));
      const unusedComponents = Array.from(declaredComponents).filter(x => !usedComponents.has(x));
      if (unusedComponents.length > 0) {
        html += \`<h2>⚠ Unused Components in /components</h2><ul>\`;
        unusedComponents.forEach(comp => {
          html += \`<li>\${comp}</li>\`;
        });
        html += \`</ul>\`;
      }

      html += \`
      <script>
        const search = document.getElementById('componentSearch');
        const filter = document.getElementById('fileFilter');
        const rows = document.querySelectorAll('#usageTable tbody tr');

        function filterRows() {
          const searchVal = search.value.toLowerCase();
          const fileVal = filter.value;
          rows.forEach(row => {
            const comp = row.dataset.comp.toLowerCase();
            const file = row.dataset.file;
            const show = (!searchVal || comp.includes(searchVal)) && (!fileVal || file === fileVal);
            row.style.display = show ? '' : 'none';
          });
        }

        function sortTable(col) {
          const table = document.getElementById("usageTable");
          const rows = Array.from(table.rows).slice(1);
          let sorted = rows.sort((a, b) => {
            const x = a.cells[col].innerText;
            const y = b.cells[col].innerText;
            return !isNaN(x) && !isNaN(y) ? y - x : x.localeCompare(y);
          });
          rows.forEach(r => table.tBodies[0].appendChild(r));
        }

        function exportCSV() {
          let csv = "Component,File,Count,Total\\n";
          rows.forEach(row => {
            if (row.style.display !== 'none') {
              const cols = row.querySelectorAll("td");
              csv += Array.from(cols).map(td => '"' + td.innerText + '"').join(",") + "\\n";
            }
          });
          const blob = new Blob([csv], { type: "text/csv" });
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "component-usage.csv";
          a.click();
        }

        search.addEventListener('input', filterRows);
        filter.addEventListener('change', filterRows);
      </script>
      </body></html>`;

          fs.writeFileSync(outputHtml, html, "utf-8");
          console.log("✅ Report saved as:", outputHtml);

          // Open HTML in default browser
          exec(`start "" "${outputHtml}"`);
          rl.close();
        }

        generateReport();
      }
    );
  }
);
