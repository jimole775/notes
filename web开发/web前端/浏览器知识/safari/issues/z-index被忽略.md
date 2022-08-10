# z-index被safari忽略的问题
- 成因：
1. 有可能是 两个目标元素有一个，设置了 css 属性 `transform:translateZ(xx)`，这样会使浏览器直接忽略 z-index 的效果

2. 有可能是 相关的父级元素中，设置了 css 属性 `-webkit-overflow-scrolling`，这样也会使 z-index 属性失效

- 解决方案：

1. 如果一样要保留 `transform:translateZ(xx)`，那么必须两个元素都使用这个属性，放弃 z-index，然后根据 z 的高度来实现 z-index 的效果

2. 直接注掉 `-webkit-overflow-scrolling` 就行
