问题:
1. 文件地址无法通过 ctrl + 点击 跳转
2. style 无法识别 less 和 scss 格式

解答:

1. 通过 下载 一个 vscode  插件 vetur

2. 然后在  user setting 里面添加一 段 代码

3. 
``` js
    "files.associations": {
        "*.vue": "vue" // 默认是 html
    }
```