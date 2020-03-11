由于phantomjs对ES6语法没有支持，在配置编译工具和打包工具的时候，又遇上 `webpage` 无法引用的问题，头疼

phantomjs在没有 async/await 或者 *generator 语法支持的时候，读写文件，或者调用子程序的时候，就非常头疼

而且，本身phantomjs提供的API就非常少，连 `第三方包` 都无法加载，本以为他有fs模块，就可以放心的使用nodejs的东西，其实，是想多了，phantomjs就是phantomjs，如果想调用nodejs的模块，必须使用 `child_process` 来调用node程序，然后再使用stdout进行通信

还有，调试非常困难，只能靠一步一步的log，即使配置了vscode的断点测试程序，跑起来就莫名其妙的卡住