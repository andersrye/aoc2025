import {getInput, memoize, printSolution} from "./utils.mjs";

const input = getInput('09').split('\n').map(s => s.split(',').map(n => parseInt(n)))

function size([x1, y1], [x2, y2]) {
  return (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1)
}

const sorted = input.flatMap((a, i) => {
  return input.slice(i + 1).map(b => [size(a, b), a, b])
}).sort(([a], [b]) => b - a)

printSolution(sorted[0][0])

function* lines(points) {
  for (let i = 1; i < points.length; i++) {
    yield [points[i - 1], points[i]]
  }
  yield [points[points.length - 1], points[0]]
}

function rect([x1, y1], [x2, y2]) {
  return lines([[x1, y1], [x1, y2], [x2, y2], [x2, y1]]).toArray()
}

function cross([ax, ay], [bx, by]) {
  return ax * by - ay * bx
}

function orient([ax, ay], [bx, by], [cx, cy]) {
  return cross([ax - bx, ay - by], [bx - cx, by - cy])
}

function intersects(a, b, c, d) {
  const oa = orient(c, d, a)
  const ob = orient(c, d, b)
  const oc = orient(a, b, c)
  const od = orient(a, b, d)
  return (oa * ob < 0 && oc * od < 0)
}

const [, a, b] = sorted[0]
console.log(a, b, rect(a, b))

const l = lines(input).toArray()
console.log('l', l)

console.log('i', intersects([7, 1], [12, 1], [11, 1], [11, 7]))

function solve(c1, c2) {
  for (const [a, b] of rect(c1, c2)) {
    for (const [c, d] of lines(input)) {
      console.log('aa', a, b, c, d, intersects(a, b, c, d))
      if(intersects(a, b, c, d)) return false
    }
  }
  return true
}

for (const [s, c1, c2] of sorted.slice(0, 1)) {
  console.log('sol', solve(c1,c2), s, c1, c2)
  
}
