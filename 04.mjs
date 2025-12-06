import {getInput, printSolution, neighbors} from "./utils.mjs";

const input = getInput('04').split('\n').map(l => l.split(''))

function* removableRolls(matrix) {
  yield* matrix.iterateMatrix().filter(([v, [y, x]]) => {
      return v === '@' && neighbors(matrix, y, x).filter(n => n === '@').count() < 4
    }
  )
}

const solution1 = removableRolls(input).count()

printSolution(solution1)

let count = 0
while (true) {
  let stop = true
  for (const [_, [y, x]] of removableRolls(input)) {
    stop = false
    count++
    input[y][x] = '.'
  }
  if (stop) break
}

printSolution(count)