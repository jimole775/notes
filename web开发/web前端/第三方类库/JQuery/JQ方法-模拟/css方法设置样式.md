 ``` js   
// 模拟JQ  css方法
function  css(elment, obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            elment.style[prop] = obj[prop]
        }
    }
}
```