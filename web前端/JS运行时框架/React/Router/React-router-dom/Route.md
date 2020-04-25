Router的基本组件，类似angular的 *$stateProvider* 和 *ui-view* 的组合

主要用于 ```配置组件数据``` 和作为 ```组件容器```

样例1:
``` jsx
<Route exact path="/home" component={Home} />
```

样例2：
``` jsx
<Route exact path="/home" render={(props)=><div></div>} />
```
