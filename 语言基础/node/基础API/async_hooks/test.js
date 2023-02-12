const fs = require('fs')
const { createHook, AsyncResource } = require('node:async_hooks')
function callback () {
    fs.writeFileSync(1, 'the callback fun\n')
}

const ar = new AsyncResource('AsyncResource')
createHook({
    init (asyncId) {
        // 这里不能使用 console.log(), 因为 console.log也是异步方法
        // 可以使用 fs.writeFileSync(1, type) 打印到控制台
        fs.writeFileSync(1, asyncId + '\n')
    },
    before () {
        fs.writeFileSync(1, 'brfore\n')
    },
    after () {
        fs.writeFileSync(1, 'after\n')
    }
}).enable()

ar.runInAsyncScope(callback, null, null, '')
ar.emitDestroy()
fs.writeFileSync(1, 'do i run first\n')
