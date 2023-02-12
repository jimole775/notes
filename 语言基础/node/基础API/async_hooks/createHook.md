底层接口，用来检测异步事件的运行状态的，当然只针对其运行的上下文环境，不能跨线程（Worker）

**使用 Hook 会有性能损耗，一般只用作调试，或者写插件时用于捕获准确的报错信息**

``` js
const fs = require('fs')
const {} = require('node:async_hooks')
createHook({
    init (asyncId, type) {
        // 这里不能使用 console.log(), 因为 console.log也是异步方法
        // 可以使用 fs.writeFileSync(1, type) 打印到控制台
        fs.writeFileSync(1, type)
    }
}).enable()

setTimeout(() => {
    console.log('the async fun instance run at id:', executionAsyncId())
})
```