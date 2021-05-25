var input = "monk, bbc, konm, cbb, dell, ledl";
var words = input.split(", "); // [ 'monk', 'konm', 'bbc', 'cbb', 'dell', 'ledl' ]

var obj = {};
var obj2 = [];
var bucket = [];
for ( var i = 0; i < words.length; i++) {

    var word = words[i];
    // take each word, splits, sorts and joins together.
    // so: word monk ===> kmno, bbc ===> bbc, konm ===> kmno
    var alphabetical = word.split("").sort().join("");
    bucket.push(alphabetical); // collect the sorted words
    
    // If we want to see where each anagram words occured in the array
    /**
        monk - konm (0, 2)
        bbc - cbb (1, 3)
        konm - monk (2, 0)
        cbb - bbc (3, 1)
        dell - ledl (4, 5)
        ledl - dell (5, 4)
    */
    for (var j = 0; j < words.length; j++) {
        if (i === j) {
            continue;
        }
        var other = words[j];
        if(alphabetical === other.split("").sort().join("")){
            console.log(word + " - " + other + " (" + i + ", " + j + ")");
        }
    }
}
// Remove Duplicates using Set(). Set does not allow duplicate in the array.
console.log('Remove duplicate words using Set: ', new Set(bucket));


// Or remove duplicates using filter
function removeDuplicates(a) {
  return a.filter((element, index) => a.indexOf(element) === index);
}
console.log('Remove duplicates using filter: ', removeDuplicates(bucket));

