缺陷：
1. 没有路由系统，所有页面，需要一次性加载，由于是根植于平台的程序，出于安全性的考虑，必需要一次性把runtime资源全部交给平台进行编译。
2. 根据mpvue-shop项目的结构看，`app.config.pages` 配置页面每个入口都是js文件，所以，每个vue页面都需要**额外编写一个js**，进行 `$mounted()` 操作
```js
import Vue from 'vue'
import App from './index.vue'

const app = new Vue(App)
app.$mount()
```