# 概述
自动前缀工具,用于CSS (*这个loader已经废弃，现在统一使用postcss-loader代替*)

# 安装
$ npm install autoprefixer-loader --save-dev

# 配置:
``` javascript
    loaders: [{
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "> 1%"]}',
    }]
```

