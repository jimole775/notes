// 图片懒加载
Vue.use(VueLazyload, {
preLoad: 1.3,
error: 'dist/error.png',
loading: 'dist/loading.gif',
attempt: 1
})


<img v-lazy="/static/img/1.png">