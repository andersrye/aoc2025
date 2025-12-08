import {getInput, memoize, printSolution} from "./utils.mjs";

const input = getInput('08').split('\n').map(s => s.split(',').map(n => parseInt(n)))

function dist([x1, y1, z1], [x2, y2, z2]) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2)
}
const sorted = input.flatMap((a, i) => {
  return input.slice(i + 1).map(b => [dist(a, b), a, b])
})
  .sort(([d1], [d2]) => d1 - d2)

let groupId = 1

const res = sorted
  .slice(0, process.env.EXAMPLE ? 10 : 1000)
  .reduce((acc, [, a, b]) => {
    const id = (acc[a] || acc[b] || groupId++)
    if (acc[a] && acc[b] && acc[a] !== acc[b]) {
      const other = acc[b]
      acc.entries().forEach(([k, v]) => {
        if (v === other) {
          acc[k] = id
        }
      })
    }
    acc[a] = acc[b] = id
    return acc
  }, {}).values().freq().values().sort((a, b) => b - a).slice(0, 3).product()

printSolution(res)
