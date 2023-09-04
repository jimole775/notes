
# koa-onerror
## 样例
```js
    const fs = require('fs');
    const koa = require('koa');
    const onerror = require('koa-onerror');
    
    const app = new koa();
    
    onerror(app,{
        all: true, // if options.all exist, ignore negotiation
        text: ()=>{}, //text error handler
        json: ()=>{}, //json error handler
        html: ()=>{}, //html error handler
        redirect: './404', //if accepct html, can redirect to another error page
    });
    
    app.use(ctx => {
        // foo();
        ctx.body = fs.createReadStream('not exist');
    });
```