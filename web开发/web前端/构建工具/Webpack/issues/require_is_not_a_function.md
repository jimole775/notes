
# require is not a function

## 报错原因
``` js
// ./node_modules/_formidable@1.2.1@formidable/lib/incoming_form.js
var require
if (global.GENTLY) require = GENTLY.hijack(...)
var xxx = require(...)
```
- 主要是由于 global.GENTLY 为空，导致require无法正确初始化

## 解决
``` js
var webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ]
}
```