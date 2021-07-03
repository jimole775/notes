# state setState

直接修改state，组件并不会重新触发render()，所以需要使用setState

```js
this.setState({name:"Rongxis"});
```

# state props 

这两个状态的更新，有可能是异步，所以，直接调用this.props作为依赖计算，有可能出现问题

```js
// 错误
this.setState({
    fullName:this.firstName + this.props.lastName
});
```
应该使用一个回调来处理

```js
// 参数都是默认的
this.setState((state,props)=>({
    fullName:state.firstName + props.lastName
}));
```

# 一个事件，多次调用this.setState()
如果参数的Object,就会被合并处理，只调用一次update，如果参数是function，就会存入函数队列，会有多次update

比如:
```js
this.handleClick = ()=>{
    this.setState({
        count: this.count ++
    });

    this.setState({
        count: this.count ++
    });

    this.setState((state,props)=>{
        state.count ++;
    });

    this.setState((state,props)=>{
        state.count ++;
    });
}

```

# 修改引用类型的state属性
一般需要返回一个新的对象，要不然不会更新

比如：
```js
/** 要新增一个名字*/
// 正确
this.setState((state)=>({
    state.names = [...state.names,"Rongxis"];
}));

// 无效
this.setState((state)=>({
    state.names = state.names.push("Rongxis");
}));
```