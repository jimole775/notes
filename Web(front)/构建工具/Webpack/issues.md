
# can't find module 'xxx'
如果出现这样的情况，一般都是
安装了 [xxx-loader]，却忘记安装核心库了

比如: 

安装了 *pug-loader*，就必须安装 *pug*

# node环境中使用webpack()无法正确执行

当在node中使用webpack指令进行打包时，需要注意的一点是：
```js
const webpack = require('webpack');
webpack(config,function(err,dst){
   // 回调必须声明，否则打包流程完全不执行
   console.log("is run fined!");
});
```

# require is not a function

### 报错原因
``` js
// ./node_modules/_formidable@1.2.1@formidable/lib/incoming_form.js
var require
if (global.GENTLY) require = GENTLY.hijack(...)
var xxx = require(...)
```
主要是由于 global.GENTLY 为空，导致require无法正确初始化

### 解决
``` js
var webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ]
}
```

# webpack-dev-server BaseClient.js 报错
### 原因
由于webpack和webpack-dev-server版本的不对应造成的错误

这种BUG经常出现在架构工具更新的时候

以后应该记录出对应的配合比较稳定的工具版本

### 解决
- webpack@4
``` js
    "webpack": "4.16.5",
    "webpack-bundle-analyzer": "2.13.1",
    "webpack-cli": "3.1.0",
    "webpack-dev-server": "3.1.5",
    "webpack-merge": "4.1.4"
```
- webpack@3
``` js

```
