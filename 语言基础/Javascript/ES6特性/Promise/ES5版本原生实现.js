export default function $Promise(bootStrap) {
  this.state = 'unstart'
  this.resovleTaskQueue = [] // 任务队列，由 'this.then' 被调用的时候存储
  this.rejectTaskQueue = [] // 任务队列，由 'this.then' 被调用的时候存储

  // 由于ES5函数内部this的指向问题，
  // 这里必须先固定指向MyPromise内部
  // 否则 solve 或 reject 被调用的时候，this将指向global
  var that = this

  // taskQueue队列调用的开关
  var solve = function(response) {
    that.callTasks(response, null)
  }

  // 异常处理的开关
  var reject = function(response) {
    // that.errHandler('reject: ', response)
    that.callTasks(null, response)
  }

  bootStrap && bootStrap(solve, reject)
}

$Promise.prototype.errHandler = function(errInfo) {
  // 原生错误处理器，直接抛出错误，打断流程
  throw errInfo
}

$Promise.prototype.finallyHandler = function() {}

$Promise.prototype.callTasks = function(solveResponse, rejectResponse) {
  try {
    // 直接执行 then 存储的任务
    const nextResponse = this.resovleTaskQueue.shift()(solveResponse)
    if (this.resovleTaskQueue.length) {
      this.state = 'pending'
      this.callTasks(nextResponse || solveResponse)
    } else if (this.finallyQueue.length) {
      this.state = 'pending'
      this.finallyHandler(nextResponse || solveResponse)
    } else {
      this.state = 'end'
    }
  } catch (error) {
    this.errHandler(error)
  }
}

$Promise.prototype.then = function(resovleTask, rejectTask) {
  this.resovleTaskQueue.push(resovleTask)
  this.rejectTaskQueue.push(rejectTask)
  return this
}

$Promise.prototype.catch = function(errHandler) {
  this.errHandler = errHandler
  return this
}

$Promise.prototype.finally = function(finallyHandler) {
  this.finallyHandler = finallyHandler
  return this
}

// usage:
// 输出 'then1: 1  then2: 2  finally: 3'
// let tick = 0
// const promise = new MyPromise(function(s, j) {
//   setTimeout(() => {
//     s(++tick)
//   }, 1000)
// })

// promise
//   .then(data => {
//     console.log("then1:", data)
//     return data + 1
//   })
//   .then(data => {
//     console.log("then2:", data)
//     return data + 1
//   })
//   .catch(data => {
//     console.log("err:", data)
//   })
//   .finally(data => {
//     console.log("finally:", data)
//   })
