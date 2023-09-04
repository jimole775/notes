
# 安装
``` bash
npm install --save-dev mini-css-extract-plugin
```

# 配置
``` javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development', //hot-module-reload
              reloadAll:true,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
```
# 引用
[更多配置方式](https://github.com/webpack-contrib/mini-css-extract-plugin)