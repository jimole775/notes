# 安装
``` bash
#因为sass-loader依赖于node-sass，所以还要安装node-sass
npm install sass-loader node-sass 
```

# 安装
``` javascript
    module: {
        loaders: [{
            test:/\.scss$/,
            loader:"style-loader!css-loader!sass-loader",
            exclude: [/node_modules/,/plugins/]     //打包的时候剔除这个文件夹下面的内容
        }]
    }
```    
# 备注
由于sass的以下两点缺点：**本人已经弃用sass,改用less**
1. 只能导入，不能引用其他模块，这样经常导致会重复加载相同的css模块
2. 安装总是遇到node-sass安装异常，和python依赖异常的问题

