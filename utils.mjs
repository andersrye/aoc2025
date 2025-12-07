import './dirty-tricks.mjs'
import fs from 'fs'

export function getInput(day) {
  const folder = process.env.EXAMPLE ? 'examples' : 'inputs'
  const path = `./${folder}/${day}.txt`
  return fs.readFileSync(path, 'utf-8')
}

export function memoize(fn, keyFn = (...args) => args.toString()) {
  const cache = {}
  return function (...args) {
    const key = keyFn(...args)
    return cache[key] ??= fn(...args)
  }
}

export function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

export function* neighbors(matrix, y, x) {
  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (matrix[i]?.[j] !== undefined && !(i === y && j === x)) {
        yield matrix[i][j]
      }
    }
  }
}

export function resetTimer() {
  timer = performance.now()
}

let solutionCounter = 0
let totalTime = 0

export function printSolution(solution) {
  const time = performance.now() - timer
  totalTime += time
  console.log('Solution', ++solutionCounter, '=', solution, 'in', time.toFixed(2), 'ms')
  resetTimer()
}

export function printTotalTime() {
  const time = performance.now() - startTime
  console.log(`Total time: ${totalTime.toFixed(2)}ms (${time.toFixed(2)}ms)`)
}

export class PriorityQueue {
  #vals = []

  push(val, priority) {
    const index = this.#vals.findIndex(([_, p]) => priority > p)
    if (index === -1) {
      this.#vals.push([val, priority])
    } else {
      this.#vals.splice(index, 0, [val, priority])
    }
  }

  pop() {
    return this.#vals.pop()
  }

  get length() {
    return this.#vals.length
  }
}


const startTime = performance.now()
let timer = startTime
