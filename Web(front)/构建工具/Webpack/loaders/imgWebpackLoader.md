

[API地址](https://www.npmjs.com/package/image-webpack-loader)

# 安装
``` bash
$ npm install url-loader file-loader --save-dev
```

# 配置
``` javascript
    module: {
        loaders: [{
            test:/\.(jpg|png)$/,
            loader:"url-loader?limit=8192",
            exclude: [/node_modules/,/plugins/]     //打包的时候剔除这个文件夹下面的内容
        }]
    }
```

以上加载器已经做古
请用新的图片加载器 image-webpack-loader 代替

webpack2.x样例:

``` javascript
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    outputPath:"assets/images/",
                    name: '[hash].[ext]'
                }
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true
                    },
                    gifsicle: {
                        interlaced: true
                    },
                    optipng: {
                        optimizationLevel: 7
                    }
                }
            }
        ]
    }
```
