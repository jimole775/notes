$ npm install url-loader file-loader --save-dev

    module: {
        loaders: [{
            test:/\.(jpg|png)$/,
            loader:"url-loader?limit=8192",
            exclude: [/node_modules/,/plugins/]     //打包的时候剔除这个文件夹下面的内容
        }]
    }

===============================================================<-
以上加载器已经做古
请用新的图片加载器 image-webpack-loader 代替

样例:(webpack v2)

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
               }]
    }

API url:
https://www.npmjs.com/package/image-webpack-loader