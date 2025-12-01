import {getInput, printSolution} from './utils.mjs'

const input = getInput('01').split('\n').map(l => {
  const match = l.match(/([LR])(\d+)/)
  return [match[1], parseInt(match[2])]
})

const solution1 = input.reduce(([value, count], [dir, num]) => {
  value = (dir === 'R' ? value + num : value - num) % 100
  if (value === 0) count++
  return [value, count]
}, [50, 0])[1]

printSolution(solution1)

const solution2 = input.reduce(([value, count], [dir, num]) => {
  while (num-- > 0) {
    value = (value + (dir === 'R' ? 1 : -1) + 100) % 100
    if (value === 0) count++
  }
  return [value, count]
}, [50, 0])[1]

printSolution(solution2)