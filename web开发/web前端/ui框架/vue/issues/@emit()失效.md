造成这样情况的有以下两种类型：
1. 事件名带有大写字母
``` js
export default {
  methods:{
    confirm() {
      this.$emit('successEvent') // 无效
    }
  }
}
```

2. 触发事件前，当前窗口被关闭(多数情况下是 modal 窗口)
``` js
export default {
  methods:{
    confirm() {
      this.modal.show = false 
      this.$emit('success') // 失效
    }
  }
}
```