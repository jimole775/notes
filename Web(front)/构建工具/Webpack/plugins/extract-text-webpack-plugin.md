# 概述
有时候可能希望项目的样式能不要被打包到脚本中，
而是独立出来作为.css，然后在页面中以<link>标签引入。
这时候我们需要 [extract-text-webpack-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 来帮忙。
最重要的一点还是:
**如果使用sass定义@mixin混合器之类的公共方法,不预先加载的话,会出现undefined,根本无法使用**


# 安装
- 版本"1"和版本"2,3"的配置有区别,请注意区分,版本错误,调用失败会报错 - "window is not defined"
- **如果使用webpack4.x以上的版本的话，请使用mini-css-extract-plugin代替这个插件，在4.x版本下，这个插件已经不再用来处理css了**
```bash
$ npm install --save-dev extract-text-webpack-plugin@1.0.1
$ npm install --save-dev extract-text-webpack-plugin@2.1.2
$ npm install --save-dev extract-text-webpack-plugin
```

# 配置

- [v1.0.1]的配置：

```javascript
     var ExtractTextPlugin = require("extract-text-webpack-plugin");

     module:{
         loaders:[
         {
             test:"\.(css|scss)",
             loader:ExtractTextPlugin.extract("style-loader","css-loader!sass-loader")  //注意这里的参数配置,如果配置错误会报 "window is not defined"
         }
         ],
         plugins:[
             new ExtractTextPlugin(__dirname + "/css/[name].css");
         ]
     }
```

- [v2以上]的配置:

```javascript
    module:{
         loaders:[
         {
             test:"\.(css|scss)",
             loader:ExtractTextPlugin.extract({
                 fallback: "style-loader",
                 use: "css-loader!sass-loader"
             })
         }
         ],
         plugins:[
             new ExtractTextPlugin(__dirname + "/css/[name].css");
         ]
     }
```


[API地址](https://github.com/webpack-contrib/extract-text-webpack-plugin#api)

