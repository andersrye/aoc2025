import {getInput, memoize, printSolution} from "./utils.mjs";

const input = getInput('09').split('\n').map(s => s.split(',').map(n => parseInt(n)))

function size([x1, y1], [x2, y2]) {
  return (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1)
}

const sorted = input.flatMap((a, i) => {
  return input.slice(i + 1).map(b => [size(a, b), a, b])
}).sort(([a], [b]) => a - b).slice(-1)
console.log(sorted)
