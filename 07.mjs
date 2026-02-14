import {getInput, memoize, printSolution} from "./utils.mjs";

const matrix = getInput('07').split('\n').map(s => s.split(''))
const [, startPos] = matrix.iterateMatrix().find(([v]) => v === 'S')

function countSplits(matrix, [y, x], visited = new Set()) {
  const cell = matrix[y]?.[x]
  const key = `${y},${x}`
  if (!cell || visited.has(key)) return 0
  visited.add(key)
  if (cell === '^') {
    return 1 + countSplits(matrix, [y, x + 1], visited) + countSplits(matrix, [y, x - 1], visited)
  } else {
    return countSplits(matrix, [y + 1, x], visited)
  }
}

printSolution(countSplits(matrix, startPos))

function countTimelines(matrix, startPos) {
  const count = memoize(function ([y, x]) {
    const cell = matrix[y]?.[x]
    if (!cell) {
      return 1
    } else if (cell === '^') {
      return count([y, x + 1]) + count([y, x - 1])
    } else {
      return count([y + 1, x])
    }
  })
  return count(startPos)
}

printSolution(countTimelines(matrix, startPos))