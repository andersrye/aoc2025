import {getInput, printSolution, PriorityQueue} from "./utils.mjs";

const input = getInput('12').split('\n\n')
const pieces = input.slice(0, -1).reduce((acc, l) => {
  const [, i, piece] = l.match(/(\d):\s(.+)/s)
  acc[i] = piece.split('\n').map(r => r.split(''))
  return acc
}, {})
const boards = input.slice(-1)[0].split('\n').map(l => {
  const [,x, y, counts] = l.match(/(\d+)x(\d+): (.+)/)
  return [parseInt(x), parseInt(y), counts.split(' ').map(n => parseInt(n))]
})

console.log('pieces', pieces)
console.log('boards', boards)