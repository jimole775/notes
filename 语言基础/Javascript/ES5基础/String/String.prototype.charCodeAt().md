- 属于继承方法
- 一次只能转码一个字符；转出的是10进制的ascii码
``` js
"中国".charCodeAt(1)
String.prototype.charCodeAt.call("中国", 1)
```