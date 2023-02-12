# Maximum call stack size exceeded
- **背景**:
在测试 `createHook` 创建钩子的时候，会出现 `Maximum call stack size exceeded` 的情况。

示例代码：
``` js
const async_hooks = require('async_hooks')
async_hooks.createHook({
    init(asyncId, type, triggerAsyncId, resource) {
        console.log('type: ', type)
    }
}).enable()

setTimeout(() => {})
```

- **原因**:
一个 `console.log` 会调用3种异步类型
- type: **TTYWRAP**
- type: **SIGNALWRAP**
- type: **TickObject**

所以，在钩子中使用异步，就会无限触发钩子，造成死循环。

- **解决**：
不要使用 `console.log` 进行控制台打印，可以使用 `fs.writeFileSync(1, 'text')` 进行控制台打印
