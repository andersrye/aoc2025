import {getInput, printSolution, range} from './utils.mjs'

const input = getInput('02').split(',').map(r => r.split('-').map(n => parseInt(n)))

const solution1 = input.flatMap(([start, end]) => {
  const res = []
  for (let i = start; i <= end; i++) {
    const s = i.toString()
    const a = s.slice(0, s.length / 2)
    const b = s.slice(s.length / 2, s.length)
    if (a === b) res.push(i)
  }
  return res
}).sum()

printSolution(solution1)

const solution2 = input.map(([start, end]) => {
  return range(start, end).map(i => {
    const s = i.toString()
    for (let j = 1; j <= s.length / 2; j++) {
      let prev, invalid = true
      for (const c of s.chunk(j)) {
        if (prev && c !== prev) {
          invalid = false
          break
        }
        prev = c
      }
      if (invalid) {
        return i
      }
    }
    return 0
  }).sum() || 0
}).sum()

printSolution(solution2,)