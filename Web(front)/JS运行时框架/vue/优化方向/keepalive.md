当想要把切换出去的组件保留在内存中的时候，
可以使用keepalive标签把组件包裹起来；

<keep-alive>
  <component :is="currentView">
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>