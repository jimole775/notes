

# koa-static
## 说明
设置静态目录
## 样例
```js
    const static = require('koa-static')   //静态资源服务插件
    const path = require('path')           //路径管理

    // 配置静态资源
    const staticPath = './static'
    app.use(static(
        path.join( __dirname, staticPath)
    ))
```