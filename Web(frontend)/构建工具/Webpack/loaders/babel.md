# 概述
用于解析ES6语法,jsx语法

# 安装
- 7.x以上的配套(webpack 4.x|babel-loader 8.x|babel 7.x)
``` bash
npm install babel-loader @babel/core @babel/preset-env --save-dev
```
- 6.x以下的配套(webpack 4.x|babel-loader 7.x|babel 6.x)
``` bash
npm install babel-loader@7 @babel/core @babel/preset-env --save-dev
```

# 配置
``` javascript
    module: {
         loaders: [{
             test: /\.(js|jsx)$/,
             loaders: ['babel-loader?presets=env'],
             exclude: [/node_modules/,/plugins/] // 打包的时候剔除这个文件夹下面的内容
         }]
    }
```    