import {getInput, printSolution} from "./utils.mjs";

const [input1, input2] = getInput('05').split('\n\n')
const ranges = input1.split('\n').map(l => {
  const match = l.match(/(\d+)-(\d+)/)
  return [parseInt(match[1]), parseInt(match[2])]
})
const ingredients = input2.split('\n').map(l => parseInt(l))

const solution1 = ingredients.iterate()
  .filter(i => ranges.some(([start, end]) => i >= start && i <= end))
  .count()
printSolution(solution1)

for (let k = 0; k < 3; k++) { //RIP
  for (let i = 0; i < ranges.length; i++) {
    if (!ranges[i]) continue
    let [start1, end1] = ranges[i]
    for (let j = 0; j < ranges.length; j++) {
      if (!ranges[j]) continue
      const [start2, end2] = ranges[j]
      if (end1 >= start2 && start1 <= end2) {
        start1 = Math.min(start1, start2)
        end1 = Math.max(end1, end2)
        ranges[j] = undefined
      }
    }
    ranges[i] = [start1, end1]
  }
}

printSolution(ranges.iterate().filter(r => !!r).reduce(((acc, [s, e]) => acc + e - s + 1), 0))