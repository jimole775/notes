默认情况下只有系统级别的异步操作才能被钩子回调追踪到，而 AsyncResource 可以为我们提供了相同的追踪自定义的异步资源的能力。

我们可以用 `runInAsyncScope()` 方法来运行回调，使回调能触发 **Async hooks**。

``` js
const fs = require('fs')
const { createHook, AsyncResource } = require('node:async_hooks')
function callback () {
    fs.writeFileSync(1, 'the callback fun\n')
}
const ar = new AsyncResource('AsyncResource')

createHook({
    before () {
        fs.writeFileSync(1, 'before\n')
    },
    after () {
        fs.writeFileSync(1, 'after\n')
    }
}).enable()

// 以下语句会顺序执行，但是 runInAsyncScope 会触发异步钩子

ar.runInAsyncScope(callback, null, null, '')
ar.emitDestory()
fs.writeFileSync(1, 'do i run first?\n')
```