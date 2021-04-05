
import Clock from "CLIENT_COMPONENTS/test/Clock";
import TRC from "CLIENT_COMPONENTS/test/RelativeComponent";
import NotFound from "CLIENT_PAGES/help/NotFound";
import Login from "CLIENT_PAGES/login/Login";

export default [
    {path:"/clock", name:"clock", component:Clock},
    {path:"/trc", name:"trc", component:TRC},
    {path:"/notfound", name:"notFound", component:NotFound},
    {path:"/login", name:"login", component:Login}
]