问题:

在使用 vscode 以及 eslint 来检测 基于 webpack 的 vue-cli 的项目中，eslint 无法检测到  .vue 文件中的less 部分内容

解答:

1. 通过 下载 一个 vscode  插件 vetur

2. 然后在  user setting 里面添加一 段 代码

3. 
    "files.associations": {
        "*.vue": "vue"
    }