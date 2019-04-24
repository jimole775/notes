# 使用样例
``` js
import React,{Component} from "react";
import ReactDOM from "react-dom";
import {Route,NavLink,HashRouter,BrowserRouter,Link} from "react-router-dom";
import Home from "./home/home.jsx";
class App extends Component {

    render(){
        return pug`
            header 测试头部
            div 测试身体
            footer 测试脚部
            HashRouter
                NavLink(to="/home") 测试跳转
                Route(exact path="/home" component=Home)

        `// 上面这个换行非常重要，如果没有这个换行，这里的Route就会被解析成两个路由进行嵌套，从而导致有效的路由被忽略，home就指向一个空路由
    }
}
ReactDOM.render(<App />,document.getElementById("root"));
```