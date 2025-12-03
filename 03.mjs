import {getInput, printSolution} from "./utils.mjs";

const input = getInput('03').split('\n')
  .map(l => l.split('').map(n => parseInt(n)))

const solution1 = input.map(bank => {
  const [digit1, i] = bank.slice(0, -1).maxWithIndex()
  const digit2 = bank.slice(i + 1).max()
  return digit1 * 10 + digit2
}).sum()

printSolution(solution1)

const solution2 = input.map(bank => {
  let start = 0, max = 0
  for (let i = 11; i >= 0; i--) {
    const [digit, index] = bank.slice(start, bank.length - i).maxWithIndex()
    max += Math.pow(10, i) * digit
    start += index + 1
  }
  return max
}).sum()

printSolution(solution2)