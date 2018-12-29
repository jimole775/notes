#当在node中使用webpack指令进行打包时，需要注意的一点是：
```javascript
const webpack = require('webpack');
webpack(config,function(err,dst){
   // 回调必须声明，否则打包流程完全不执行
   console.log("is run fined!");
});
```