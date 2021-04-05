1. 标注在 **原生dom** 和 **vue组件** 上时，获取到的对象是有完全的区别的
**原生dom** 返回的是 `Element对象`，**vue组件** 就是返回的 `VueComponent对象`

2. 注意配合 `this.$nextTick()` 使用，否则很多时候无法正确获取元素