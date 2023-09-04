Async Module Defintion 的模块引入由 define 方法来定义，在 define API 中：

1. `id`：模块名称，或者模块加载器请求的指定脚本的名字；

2. `dependencies`：是个定义中模块所依赖模块的数组，默认为 `["require", "exports", "module"]`，举个例子比较好理解，当我们创建一个名为 "alpha" 的模块，使用了require，exports，和名为 "beta" 的模块，需要如下书写（示例1）；

3. `factory`：为模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值；

- template
``` js
app.controller(['jquery', function($){}])
```
- 代表：seajs, angular
