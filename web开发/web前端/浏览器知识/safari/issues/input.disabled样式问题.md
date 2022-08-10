## ios的input属性Disabled默认样式问题
- 现象：表单不可编辑状态-ios的input的属性设置为disabled，会造成字体颜色变灰

- 原因：ios默认了disabled属性时透明度为0.3

- 解决：

1. 设置 `opacity: 1; -webkit-opacity: 1;`

2. 如果opacity无法解决，那么，可以把 `diabled` 改为 `readonly`，设置成 readonly 会 **出现光标问题** 再另行处理

tips. 再注意一点，如果设置了 `-webkit-text-fill-color`，那么 `color` 会失效。
