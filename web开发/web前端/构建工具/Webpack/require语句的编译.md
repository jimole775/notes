webpack打包时，对代码中的"require"语句会做不同的处理

1. 如果扫描到require后面跟随的是变量，那么将会被忽略，结果会导致 `动态变量里的相对路径会失效`
- 解决：
  把静态资源通过webpack配置到指定路径，然后通过 `./` 的方式访问

2. 如果扫描到require调用时，参数是字符串，那么，默认这些字符串就是路径，这个路径将会被编译成webpack包资源的路径
- 现象：
  `require('../dist/' + var)` => `require('__webpack__module__/' + var)`

