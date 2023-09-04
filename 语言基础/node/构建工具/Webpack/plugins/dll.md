
# 概述

一般dll包只适合不需要修改的第三方库，如果是自写的库，需要经常修改的话，推荐使用commons-chunk-plugin插件
这种做法类似于windows系统的dll动态链库；

# 配置

首先需要打包一个dll的动态库文件：
```javascript
    const webpack = require('webpack');

    const vendors = [
        'iscroll',
        'json2',
        'lazyload'
        // ...其它库,这些库必须在package.json里面有依赖设置
    ];

    module.exports = {
        output: {
            path: __dirname + "/lib",
            filename: '[name].js',
            library: '[name]'   //dll库的名称，在输出的文件"vendor.js"里面可以查看
        },
        entry: {
            vendor: vendors
        },
        plugins: [
            new webpack.DllPlugin({
                path: 'manifest.json',
                name: '[name]', //在这里相当与要引用dll库，所以名称必须和定义的库名一致（现在定义的dll库名叫做 'vendor'）
                context:  __dirname
            })
        ]
    };
```

使用webpack命令进行打包：
```bash
$   webpack --progress --colors --config ./webpack.dll.config.js
```

为了便于使用，可以写进npm script：
```javascript
    scripts:{
        "dll": "webpack --progress --colors --config ./webpack.dll.config.js"
    }
```

```bash
$   npm run dll
```

其次，再到webpack配置文件引入：
```javascript
    new webpack.DllReferencePlugin({
      context: dirVars.staticRootDir, // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
      manifest: require('../../manifest.json'), // 指定manifest.json
      name: 'dll',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    });
```