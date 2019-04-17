
# 安装
``` bash
#鉴于jade最新版本已经改名，由于不清楚涉及的模块，推荐停留在1.11版本
#如果出现找不到module的BUG，可以是由于依赖的express安装在了全局环境，jade也同样放在了全局
#而现在在当前环境就找不到，所以在当前环境也需要安装一个express
npm install --save jade-loader    
npm install --save express jade 
```

# 配置
``` javascript
    //安装了jade之后，就可以使用loader了
    module:{
        loaders:[
            {test:/\.jade$/,loader:"jade-loader"}
        ]
    }
```