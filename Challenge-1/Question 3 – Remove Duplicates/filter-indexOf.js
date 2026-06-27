const arr = [1,2,3,6,4,3,7,4,2,6,8,2,5,9,0,1];

const unique = arr.filter((val, idx) => arr.indexOf(val) === idx);
console.log(unique);
// [1,2,3,6,4,7,8,5,9,0]