export default function $Promise (bootStrap) {
  this.sovleTaskQueue = [] // 任务队列，由 'this.then' 被调用的时候存储
  this.rejectTaskQueue = [] // 任务队列，由 'this.then' 被调用的时候存储
  this.errHandler = null
  this.finallyHandler = null
  this.bootStrap = bootStrap
  this.state = 'pending'
}

$Promise.prototype.then = function (resovleTask, rejectTask) {
  this.sovleTaskQueue.push(resovleTask || function () {})
  // 保持和resolve队列一致
  this.rejectTaskQueue.push(rejectTask || function () {})
  return emit.call(this)
}

$Promise.prototype.catch = function (customHandler) {
  this.errHandler = customHandler
  return this
}

$Promise.prototype.finally = function (customHandler) {
  this.finallyHandler = customHandler
  return emit.call(this)
}

function callSolveTasks(solveResponse) {
  try {
    var resovleTask = this.sovleTaskQueue.shift()
    // eslint-disable-line no-unused-vars
    this.rejectTaskQueue.shift()
    var nextSolveResponse = resovleTask ? resovleTask(solveResponse) : null
    if (this.sovleTaskQueue.length) {
      callSolveTasks(nextSolveResponse || solveResponse)
    } else if (this.finallyHandler) {
      this.state = 'end'
      this.finallyHandler(nextSolveResponse || solveResponse)
    } else {
      this.state = 'end'
    }
  } catch (error) {
    if (this.errHandler) {
      return this.errHandler(error)
    } else {
      throw error
    }
  }
}

function callRejectTasks(rejectResponse) {
  try {
    // eslint-disable-line no-unused-vars
    this.sovleTaskQueue.shift()
    var rejectTask = this.rejectTaskQueue.shift()
    var nextRejectResponse = rejectTask ? rejectTask(rejectResponse) : null
    if (this.sovleTaskQueue.length) {
      return callRejectTasks(nextRejectResponse || rejectResponse)
    } else if (this.finallyHandler) {
      this.state = 'end'
      return this.finallyHandler(nextRejectResponse || rejectResponse)
    } else {
      this.state = 'end'
    }
  } catch (error) {
    if (this.errHandler) {
      return this.errHandler(error)
    } else {
      throw error
    }
  }
}

// 这个方法，可以先写在 then 里面，写完之后，再封装成emit方法
function emit () {
  // 由于ES5函数内部this的指向问题，
  // 这里必须先固定指向MyPromise内部
  // 否则 solve 或 reject 被调用的时候，this将指向global
  var that = this
  if (that.state === 'pending') {
    that.state = 'working'
    // taskQueue队列调用的开关
    var solve = function (response) {
      that.state = 'resolved'
      // 因为solve不是原型方法，所以，它作为一个普通函数被调用的时候，内部的this应该会被指向null或者undefined
      // 所以这里需要用apply, 把this指向当前对象的原型
      callSolveTasks.call(that, response)
    }

    var reject = function (response) {
      that.state = 'rejected'
      callRejectTasks.call(that, response)
    }
    that.bootStrap && that.bootStrap(solve, reject)
  }
  return that
}



// usage:
// 输出 'then1: 1  then2: 2  finally: 3'
// var tick = 0
// var promise = new $Promise(function(s, j) {
//   setTimeout(() => {
//     s(++tick)
//     j(--tick)
//   }, 1000)
// })

// promise
//   .then(data => {
//     console.log("then1:", data)
//     return data + 1
//   }, failData => {
//     console.log("then1 failure:", failData)
//   })
//   .then(data => {
//     console.log("then2:", data)
//     return data + 1
//   }, failData => {
//     console.log("then2 failure:", failData)
//   })
//   .finally(data => {
//     console.log("finally:", data)
//   })
