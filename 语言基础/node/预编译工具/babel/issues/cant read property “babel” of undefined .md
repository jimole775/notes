# 说明

### 形成原因：
> E:\gitStore\random-picker\src\webContent\node_modules\babel-loader\lib\index.js:103:36
```javascript
var globalOptions = this.options.babel || {};
```
以上的问题，简单的可以使用一个判断把错误规避掉
```javascript
var globalOptions = this.options && this.options.babel || {};
```

不过，这样治标不治本。
这个问题，主要还是由于配置和版本的不兼容形成的
现在主要分2种类型的搭配：

- webpack^4.x babel^6.x babel-loader^7.x
> .babelrc
```json
{
    "preset":["preset=es2015"]
}
```
- webpack^4.x babel^7.x babel-loader^8.x
> .babelrc
```json
{
    "preset":["@babel/preset=env"]
}
```
那么说，我们就有两个选择，一个就是降低版本，第二个就是更改配置

[API地址](https://www.npmjs.com/package/babel-loader)
[issue地址](https://github.com/babel/babel-loader/issues/666)