import {getInput, printSolution} from "./utils.mjs";

const [input1, input2] = getInput('05').split('\n\n')
const ranges = input1.split('\n').map(l => {
  const [, start, end] = l.match(/(\d+)-(\d+)/)
  return [parseInt(start), parseInt(end)]
})
const ingredients = input2.split('\n').map(l => parseInt(l))

const solution1 = ingredients
  .filter(i => ranges.some(([start, end]) => i >= start && i <= end))
  .length

printSolution(solution1)

for (let i = 0; i < ranges.length; i++) {
  let [start1, end1] = ranges[i]
  for (let j = i - 1; j >= 0 ; j--) {
    if (!ranges[j]) continue
    const [start2, end2] = ranges[j]
    if (end1 >= start2 && start1 <= end2) {
      start1 = Math.min(start1, start2)
      end1 = Math.max(end1, end2)
      ranges[j] = null
      j = i - 1
    }
  }
  ranges[i] = [start1, end1]
}

const solution2 = ranges.filter(range => !!range)
  .reduce(((acc, [start, end]) => acc + end - start + 1), 0)

printSolution(solution2)