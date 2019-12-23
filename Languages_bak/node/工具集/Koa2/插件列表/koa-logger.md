

# koa-logger
## 样例
``` js
    const logger = require('koa-logger')
    const Koa = require('koa')
    
    const app = new Koa()
    app.use(logger((str, args) => {
    // redirect koa logger to other output pipe
    // default is process.stdout(by console.log function)
    }))
```