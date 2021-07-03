1. 加 id
2. 加 ref

- 需要注意的点
1. 不管是加 id 还是 ref 的时候，获取元素的动作必须在渲染并挂载后   `mounted`,不过 `mounted` 执行的时候，只能获取到一个 父级dom结构，如果需要获取完整的元素，可以搭配 `this.$nextTick()` 使用

2. 加 ref 的时候，被标记的 ref 会 `注册在当前vue实例的 $refs 属性下` , 父子组件的交互比较麻烦，
   还有一点需要注意：**原生dom** 的ref的获取方式是 `this.$refs.[refName]`，而 **vue dom** 的获取方式是 `this.$refs.[refName].$el`

