let taskLiving = 0
let taskQueue = []
let max = 5

function bunch(cb) {
  if (taskLiving >= max) {
    taskQueue.push(cb)
  } else {
    promiseEmit(cb)
  }
  taskLiving ++
}

function promiseEmit(cb) {
  return new Promise((s, j) => {cb(s, j)})
  .finally(() => {
    taskLiving --
    if (taskQueue.length > 0) {
      promiseEmit(taskQueue.shift())
    }
  })
}

let loop = 10
while(loop--) {
  bunch((s, j) => {
    setTimeout(() => {
      console.log('running task')
      s()
    }, 2000)
  })
}