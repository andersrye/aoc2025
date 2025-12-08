import {getInput, printSolution, PriorityQueue} from "./utils.mjs";

const input = getInput('10')
  .matchAll(/^\[(.+)]\s(\(.+\))\s{(.+)}$/gm)
  .map(([, l, b, j]) => ({
    lights: l.split('').map(c => c === '#'),
    buttons: b.matchAll(/(\((.+?)\))/g).map(([, , r]) => r.split(',').map(n => parseInt(n))).toArray(),
    joltages: j.split(',').map(n => parseInt(n))
  }))
  .toArray()

function solve1({lights: target, buttons}) {

  function next(buttons, lights) {
    return buttons.reduce((acc, i) => (acc[i] = !acc[i], acc), [...lights])
  }

  const queue = [[new Array(target.length).fill(false), 0]]
  const visited = new Set()
  while (queue.length > 0 && [queue[0][1] < 3]) {
    const [lights, presses] = queue.shift()
    const k = lights.toString()
    if (visited.has(k)) continue
    visited.add(k)
    if (lights.every((l, i) => l === target[i])) return presses
    buttons.forEach(b => queue.push([next(b, lights), presses + 1]))
  }
}

//const solution1 = input.map(solve1).sum()
//printSolution(solution1)

function solve2({buttons, joltages: target}) {
  const maxJolt = target.sum()
  console.log('maxJolt', maxJolt)

  function dist(joltages) {
    let sum = 0
    for (let i = 0; i < joltages.length; i++) {
      const d = target[i] - joltages[i]
      if(d<0) return null
      sum+=d
    }
    return sum
  }


  const queue = new PriorityQueue()
  queue.push([new Array(target.length).fill(0), 0], Infinity)
  const visited = new Set()
  console.log('target', target, buttons)
  while (queue.length > 0) {
    const [[joltages, presses], priority] = queue.pop()
    //console.log(joltages, presses, priority)
    const dd = dist(joltages)
    console.log('dd', dd)
    //console.log('dd', dd)
    //console.log(presses, priority)
    if(dd === 0) return presses
    const k = joltages.toString()+","+presses
    if(visited.has(k)) continue
    visited.add(k)
    buttons.forEach(button => {
      const next = button.reduce((acc, i) => (acc[i]++, acc) , [...joltages])
      //console.log('next', joltages, button, next)
      const d = dist(next)
      //console.log('d', d)
      d !== null && queue.push([next, presses + 1], presses+d)
    })
    //if(presses > 50)break
   // console.log('item', joltages, priority, presses)
  }
}

//const solution2 = input.map(solve2).toArray()
//printSolution(solution2)
console.log(solve2(input[0]))
//console.log(input.map(solve2).sum())