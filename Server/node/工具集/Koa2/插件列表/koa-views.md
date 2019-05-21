
# koa-views
## 说明
- 模板渲染插件，主要用于服务端渲染
## 样例
```js
const views = require('koa-views');
app.use(views(__dirname + '/views', {
  extension: 'pug' //这里主要以pug为模板，当然，常用的还有类似 jsp 的 ejs 模板
}))

```
