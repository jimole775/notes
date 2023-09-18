这个属性，主要是针对 ts 中，[[set]] 语义和 [[define]] 语义的不同特性导致的不同的翻译结果

ts 的新版本，useDefineForClassFields 默认都是设置为 true 的，如果不设置 ts 的默认翻译结果就使用 [[set]] 特性

可以根据以下样例，来观察两个语义的效果：
``` ts
class foo {
    value: string
    constructor (val: string) {
        this.value = 
    } 
}
```

开启 useDefineForClassFields 时，翻译结果为：

``` ts
class foo {
    value: string
    constructor (val: string) {
        this.value = val
    }
}
```