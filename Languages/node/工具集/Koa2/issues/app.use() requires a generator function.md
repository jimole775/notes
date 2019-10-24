# app.use() requires a generator function
## 原因

这是由于 koa1.x 版本的强制 ```app.use``` 方法接收 *generator* 函数

而 *koa-body* 插件返回的并不是 *generator*

``` js
    // 正确
    app.use(function *(){});

    // 报错
    app.use(koaBody({}));
```

## 解决
1. 安装 koa2 版本

2. 使用 koa-bodyparser 代替 koa-body


