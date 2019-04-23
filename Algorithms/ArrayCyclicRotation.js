const solution = (A, K) => {
    let poppedItem;
    if(Array.isArray(A)) {
        for(let i = 0; i < K; i++) {
            poppedItem = A.pop();
            A.unshift(poppedItem);
        }
        return A;
    }
    return null;
};

let A = [1,2,3,4];
let K = 3;

console.log('MAIN ARRAY: ', A);
console.log('Running 3 times: ', solution(A, K)); // Output: [ 2, 3, 4, 1 ]