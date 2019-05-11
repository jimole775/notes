- 在webpack中，最主要的就是配置好加载器 ```babel-loader```
- 还有就是确定ES的版本，在options项里面进行设置

- 样例：
``` js
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'js/[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',

                //打包除这个文件之外的文件
                exclude: path.resolve(__dirname,"./node_modules"),

                //打包包括的文件
                include: path.resolve(__dirname, "./src"),
                options: {

                    //按照目前的情况，一般先使用ES2015
                    'presets': ['latest']
                }
            }
        ]
    },
    plugins: [

        //自动生成index.html文件
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: "index.html"
        })
    ]
}
```