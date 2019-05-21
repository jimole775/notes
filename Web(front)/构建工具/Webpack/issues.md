
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

## 报错原因
``` js

   // ./node_modules/_formidable@1.2.1@formidable/lib/incoming_form.js
   var require;if (global.GENTLY) require = GENTLY.hijack(...);var xxx = require(...);

```
主要是由于 global.GENTLY 为空，导致require无法正确初始化。

## 解决
``` js
var webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ]
}
```