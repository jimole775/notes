# 异步操作
可以和 setTimeout setImmediate 进行特性对比

``` js
setTimeout(() => console.log(1), 100)
setImmediate(() => console.log(2))
process.nextTick(() => console.log(3))
setTimeout(() => {
    for (let i = 0; i < 1000000; i++) {
        ;
    }
    console.log(4)
}, 100)
```