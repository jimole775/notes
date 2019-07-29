babel7中已经取消了 ```ployfill``` 

改由 ```@babel/core + @babel/plugin-transform-runtime``` 进行组合使用

- 安装
``` bash
npm install @babel/plugin-plugin-transform-runtime --save-dev #babel^7以上的版本
```

- 配置
``` js
     "babel": {
        "presets": [
        "@babel/preset-env"
        ],
        "plugins": [
        "@babel/plugin-transform-runtime"
        ]
  }
```
