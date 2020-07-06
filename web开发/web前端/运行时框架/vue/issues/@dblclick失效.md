有可能版本问题，也有可能是在父级使用了dragger="true"的问题，导致@dblclick事件失效（待测试）

解决：
直接使用 ".native" 修饰符，就可以解决，native 的意义应该是直接调用根元素的 原生事件

``` html
    <myComponent @dblclick.native="doExec()"></myComponent>
```