# a-table的宽度处理
当需要“动态展示列”和“冻结列”同时加载到一个table的时候，需要添加scroll属性，并且深度监听column对象，实时调整scroll的值，并把scroll绑定到:style属性上（width='scroll.x' maxWidth='100%'）
如果不那么做，就会出现空白间隙

# a-table冻结列的处理
设置冻结列的时候，必须根据fixed:left和fixed:right的区别，把column对象分别插入到数组的最左边和最右边

# a-select的处理
如果开启search模式，必须添加属性（:filterOption="false"），否则只能根据value值搜索，而不能根据展示的文本值搜索    

# watch深度监听时，内部this的指向问题处理
``` js
watch: {
  handler: () => {
    console.log(this) // 此时this指向 watch 对象，但是watch内部时没有this的，所以打印 undefined
  },
  deep: true,
}
```

``` js
watch: {
  handler() {
    console.log(this) // 此时this指向 $vue 对象，因为watch对象没有this，所以会一直向上层查找
  },
  deep: true,
}
```
