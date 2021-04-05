# :loading失效的问题
可以改成 `v-loading` 就可以生效
# element-UI(v2.4.9)table性能问题
- 原因

由于table所有cell都监听cell-mouse-enter cell-mouse-leave 事件来控制表头元素显示，导致的重绘造成的

- 解决

升级到2.6.0以上版本就可解决

- https://github.com/ElemeFE/element/issues/14981
