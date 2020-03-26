function MyPromise(bootStrap) {
  this.taskResponse = null
  this.taskErrInfo = null
  this.taskQueue = [] // 任务队列，由 'this.then' 被调用的时候存储

  // 由于ES5函数内部this的指向问题，
  // 这里必须先固定指向MyPromise内部
  // 否则 solve 或 reject 被调用的时候，this将指向global
  var that = this

  // taskQueue队列调用的开关
  var solve = function(response) {
    that.taskResponse = response
    that.callTasks(that.taskResponse)
  }

  // 异常处理的开关
  var reject = function(response) {
    that.taskErr = response
    that.errHandler(that.taskErr)
  }

  // 默认处理异常的函数
  this.errHandler = function() {
    throw this.taskErrInfo
  }

  // 默认终点的执行函数
  this.finallyHandler = function() {}

  bootStrap && bootStrap(solve, reject)
}

MyPromise.prototype.callTasks = function(taskResponse) {
  try {
    // 直接执行 then 存储的任务
    const nextResponse = this.taskQueue.shift()(taskResponse)
    if (this.taskQueue.length) {
      this.callTasks(nextResponse || taskResponse)
    } else if (this.finallyQueue.length) {
      this.finallyHandler(nextResponse || taskResponse)
    }
  } catch (error) {
    this.errHandler(error)
  }
}

MyPromise.prototype.then = function(task) {
  this.taskQueue.push(task)
  return this
}

MyPromise.prototype.catch = function(errHandler) {
  this.errHandler = errHandler
  return this
}

MyPromise.prototype.finally = function(finallyHandler) {
  this.finallyHandler = finallyHandler
  return this
}

// usage:
// 输出 'then1: 1  then2: 2  finally: 3'
let tick = 0
const promise = new MyPromise(function(s, j) {
  setTimeout(() => {
    s(++tick)
  }, 1000)
})

promise
  .then(data => {
    console.log("then1:", data)
    return data + 1
  })
  .then(data => {
    console.log("then2:", data)
    return data + 1
  })
  .catch(data => {
    console.log("err:", data)
  })
  .finally(data => {
    console.log("finally:", data)
  })
