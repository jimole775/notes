
import {Route,Redirect} from "react-router-dom";
import React from "react";
import routes from "./routesMap";

export default routes.map((item, index) => {
    console.log("routes item:",item);
    return (<Route key={index} path={item.path} exact render={ props =>{
            console.log("Route:",props);
            return (hasLogined() ? <item.component {...props} /> : <Redirect to={loginPage(props)} />)
        }}
    />)
})

function loginPage(props){
    return {
        pathname: '/login', state: { from: props.location }
    }
}

function hasLogined(){
    return true
}
