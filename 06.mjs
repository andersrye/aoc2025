import {getInput, printSolution} from "./utils.mjs";

const [first, ...rest] = getInput('06').split('\n').map(s => s + " ").reverse()
const input = first
  .matchAll(/(\S)\s*/g)
  .map(({0: match, 1: op, index}) => {
    return [op, ...rest.map(s => s.slice(index, index + match.length - 1))]
  })
  .toArray()

const solution1 = input
  .map(([operator, ...operands]) => {
    operands = operands.map(n => parseInt(n))
    return operator === '+' ? operands.sum() : operands.product()
  }).sum()

printSolution(solution1)

const solution2 = input
  .map(([operator, ...operands]) => {
    operands = operands
      .map(n => n.split(''))
      .transpose()
      .map(r => parseInt(r.reverse().join('')))
    return operator === '+' ? operands.sum() : operands.product()
  }).sum()

printSolution(solution2)