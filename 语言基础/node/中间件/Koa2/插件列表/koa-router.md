
# koa-router
## 说明
路由工具，以下样例必须在版本 ```koa2.x``` 和 ```koa-router7.x``` 以上
## 样例
- js(router.js)
```  js
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

```
- html(index.jade)
``` jade
    block content
        h1= title
        p Welcome to #{title}
```
- app.js
``` js
const index = require('./router.js');
app.use(index.routes(),// 将该Router对象的中间件注册到Koa实例上，后续请求的主要处理逻辑
 index.allowedMethods()) // 添加针对OPTIONS的响应处理，以及一些METHOD不支持的处理
// 对于 allowedMethods，http://www.imooc.com/article/51396 有比较详细的文章
```
