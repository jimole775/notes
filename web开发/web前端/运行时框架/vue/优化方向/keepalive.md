# 标签形式的keep-alive
``` html
<!-- 当想要把切换出去的组件保留在内存中的时候，可以使用keepalive标签把组件包裹起来 -->
<keep-alive include="aa" exclude="bb">
  <!-- include的值可以为 字符串、数组、以及正则表达式 -->
  <component :is="currentView">
    <!-- 非活动组件将被缓存！keep-alive是一个抽象的组件，缓存的组件不会被mounted,为此提供activated和deactivated钩子函数, 注：当使用正则表达式或者数组时，一定要使用v-bind -->
  </component>
</keep-alive>
```

# 路由属性 keepalive
<!-- // routes 配置 -->
``` js
export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: true // 需要被缓存
    }
  }, {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      keepAlive: false // 不需要被缓存
    }
  }
]
```
``` html
<keep-alive>
    <router-view v-if="$route.meta.keepAlive">
      <!-- 这里是会被缓存的视图组件，比如 Home！ -->
    </router-view>
</keep-alive>
```