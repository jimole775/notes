
# koa-json
## 说明
主要的作用，就是用来格式化json数据的，包括 json对象 <=> 二进制
## 样例
```js
    var Koa = require('koa');
    var app = new Koa();
    
    app.use(json({ pretty: false, param: 'pretty' }));
    
    app.use((ctx) => {
        ctx.body = { foo: 'bar' };
    });
```
