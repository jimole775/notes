## link 元标签
一般link都是用来加载css的，但也可以用来预加载js，允许我们控制浏览器,提前针对一些资源去做这些操作,以提高性能
1. preconnect型: link提前对一个服务器建立tcp链接
2. prefetch型: link提前取href指定的url的内容
3. preload型: link提前渲染href指定的url
4. prerendner型: link提前渲染href 指定的url
5. relmodulepreload型: link作用预先加载一个js模块 .这可以保证js模块不必等到执行时才加载(只加载不运行 存储在内存中)
