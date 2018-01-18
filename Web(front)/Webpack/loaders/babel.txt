...| 说明:
...用于解析ES6语法

...| 安装:
npm install babel-loader babel-core babel-preset-es2015 --save-dev

...| 配置:
    module: {
         loaders: [{
             test: /\.js$/,
             loaders: ['babel-loader?presets[]=es2015'],
             exclude: [/node_modules/,/plugins/]     //打包的时候剔除这个文件夹下面的内容
         }]
    }