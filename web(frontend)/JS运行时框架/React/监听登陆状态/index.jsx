import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router,Route,Switch,Redirect,NavLink} from "react-router-dom";
import Routes from "CLIENT_ROUTES/routesController";
import Home from "CLIENT_PAGES/home/Home";

class Index extends React.Component {
    constructor(props){
        super(props);
        console.log("props:",props);
    }

    componentDidUpdate(){
        console.log("is router jump at App module!");
    }

    render(){
        return (
            <div>             
                <Router>
                    <Home/>
                    <NavLink to="/trc"> 测试TRC </NavLink>
                    <Switch>{ Routes }</Switch>
                </Router> 
            </div>
        )
    }
}

ReactDOM.render(<Index/>, document.getElementById("root"));



