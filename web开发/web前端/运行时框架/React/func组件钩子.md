### 处理state
``` js
function AComponent(){
    const [allNumber,setAllNumber] = React.useState(1);

    return(
        <div>
            {allNumber}
            <button onClick={() => setAllNumber(allNumber + 1)}>test</button>
        </div>
    )
}
```

### 处理组件属性的监听
``` js
function AComponent(){
    React.useEffect(()=>{
        console.log("componentDidMount")
        return function cleanup() { console.log("组件被卸载componentDidMount")}
    }, []) // 加载空数组参数，回调只执行一次，效果相当于 componentDidMount
}

function AComponent(){
    React.useEffect(()=>{
      console.log("componentDidUpdate")
    }) // 不加第二个参数，效果相当于 componentDidUpdate
}
```

