// characters based
detectAnagram(one: any, two:any) {
  const sortedWord = one
    .replace(/ /g, "")
    .toLowerCase()
    .split("")
    .sort()
    .join("");
  const sortedWordTwo = two
    .replace(/ /g, "")
    .toLowerCase()
    .split("")
    .sort()
    .join("");

    return sortedWord === sortedWordTwo
 }

 detectAnagrams('giraffe', '   G   ira  f fe')

 // word base
 var input = "monk, konm, bbc, cbb, dell, ledl";
var words = input.split(", ");

for (var i = 0; i < words.length; i++) {

  var word = words[i];
  var alphabetical = word.split("").sort().join("");

  for (var j = 0; j < words.length; j++) {

    if (i === j) {
      continue;
    }

    var other = words[j];
    if (alphabetical === other.split("").sort().join("")) {
      console.log(word + " - " + other + " (" + i + ", " + j + ")");
    }
  }
}
