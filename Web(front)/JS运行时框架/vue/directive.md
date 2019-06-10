主要用于注册全局的公共属性的

``` js
Vue.directive('test',{
    bind: (el,binding,vnode,oldVnode)=>{},//只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。

    inserted: (el,binding,vnode,oldVnode)=>{},//被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。

    update: (el,binding,vnode,oldVnode)=>{},//被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。

    componentUpdated: (el,binding,vnode,oldVnode)=>{},//被绑定元素所在模板完成一次更新周期时调用。

    unbind: (el,binding,vnode,oldVnode)=>{},//只调用一次， 指令与元素解绑时调用。
});

<template>
    <div v-test:params=''></div> 
</template>
```

https://cn.vuejs.org/v2/guide/custom-directive.html