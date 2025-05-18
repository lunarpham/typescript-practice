// Annotate params and return types
function mathSum1(a: number, b: number) {
  return a + b;
}

function mathSum2(a: number, b?: number) {
  return a + b;
}

function mathSum3(a: number, b = 1) {
  return a + b;
}

function mathSum4(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(mathSum1(3, 6));
console.log(mathSum2(3));
console.log(mathSum3(3));
console.log(mathSum4(3, 6, 9, 7, 1));
