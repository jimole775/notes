# 安装
``` bash
$ npm install url-loader file-loader --save-dev 
```

# 配置
```javascript
    module: {
        loaders: [{
            test:/\.(woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=10000&name=library/fonts/[name].[ext]',
            exclude: [/node_modules/,/plugins/]     //打包的时候剔除这个文件夹下面的内容
        }]
    }
```    