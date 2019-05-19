用于配置路由重定向,现在知道的情况，就是内嵌在 ```Route``` 内部使用

样例
``` js
    <Route path="/home" render={(props)=>{
        return <Redirect to={{pathname:"/login",state:{from:props.location}}}></Redirect>
    }}>
    </Route>
```