1. 用vscode开发java时，必要的插件：
    - A. Debugger for Java(依赖B插件，不过他们会一起被下载，不需要关注)
    - B. Language Support for Java(TM) by Red Hat(注意和[Language Support for Java的区别])
2. VSCode的坑
    - A. VSCode会给每个java文件指定包名，如果程序里使用错误的包名，会提示错误，并且修改后仍会报错，需删除再新建
    - B. 重装过JDK，而没有重新配置也会导致错误