let taskLiving = 0
let taskQueue = [] // 存储队列
let max = 5

function bunch(task) {
  // 任务多出限制，就存储
  if (taskLiving >= max) {
    taskQueue.push(task)
  } else {
    // 任务少于限制，调用
    promiseEmit(task)
  }
  taskLiving ++
}

function promiseEmit(task) {
  return new Promise((s, j) => { task(s, j) })
  .finally(() => { // 以finally方法，当作并发异步任务的状态观测点
    taskLiving --
    if (taskQueue.length > 0) {
      // 递归操作
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