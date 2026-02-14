import {getInput, printSolution, PriorityQueue} from "./utils.mjs";

const input = getInput('11').matchAll(/^(\w{3}): (.+)$/gm).reduce((acc, [, first, rest]) => (acc[first] = rest.split(' '), acc), {})

function solve(graph) {
  let count = 0
  const stack = ['you']
  const visited = new Set()
  while (stack.length > 0) {
    const item = stack.pop()
    //if(visited.has(item)) continue
    //visited.add(item)
    if(item === 'out') {
      count++
      continue
    }
    stack.push(...graph[item])
  }
  return count
}

//printSolution(solve(input))

function solve2(graph) {
  let count = 0
  const stack = [['you', 0]]
  while (stack.length > 0) {
    let [item, c, visited] = stack.pop()
   // console.log('s', stack.length, c)
    //if(visited.has(item)) {
    //  console.log('loop!')
    //}
    //visited.add(item)
    if(item === 'out') {
      count++
      //console.log('count!', count)
      continue
    }
    if(item === 'fft' || item === 'dac') {
      c++
    }
    const next = graph[item]?.map(i => [i, c])
    next && stack.push(...next)
  }
  return count
}

printSolution(solve2(input))