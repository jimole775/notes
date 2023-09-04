# Babel6 及以下的配置


- 默认格式：
{
  "presets": [],    //转码规则
  "ignore":[],  //忽略转码文件
  "plugins": []
}

- "presets" 字段的规定的所有转码规则：

- ES2015转码规则
``` bash
$ npm install --save-dev babel-preset-es2015
```
- react转码规则
``` bash
$ npm install --save-dev babel-preset-react
```
- ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
``` bash
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```

- 最后的配置格式如下：
``` json
{
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "ignore":[
        "jquery.min.js",
        "angular.min.js"
    ],
    "plugins": []
}
```