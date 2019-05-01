const newArray = [];
const flatten = list => {
    if(Array.isArray(list)) {
        let tuple;
        for(let i = 0; i < list.length; i++) {
            tuple = list[i];
            flatten(tuple);
        }
    }
    else {
        newArray.push(list);
    }
    return newArray;
};

const myArray = ['a','b',['c','d',['e','f','g']],'h'];
console.log(' ORIGINAL ARRAY: ', myArray, ' - AFTER FLATTENED: ', flatten(myArray));
