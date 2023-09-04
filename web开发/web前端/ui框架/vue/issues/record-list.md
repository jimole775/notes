# [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
## 原因
vue有两种形式的代码 compiler（模板）模式和runtime模式（运行时），vue模块的package.json的main字段默认为runtime模式， 指向了`"dist/vue.runtime.common.js"`位置。

这是vue升级到2.0之后就有的特点。

而我的main.js文件中，初始化vue却是这么写的，这种形式为compiler模式的，所以就会出现上面的错误信息

``` js
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
})
```
## 解决办法
### 方法一
- 使用 runtime 的渲染方式
``` js
//runtime
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
```
### 方法二
- 继续使用 compiler 方式 
``` js
resolve: {
    alias: {
        'vue$': 'vue/dist/vue.esm.js' // 替换 import Vue from 'vue' 引用的文件
    }
}
```
