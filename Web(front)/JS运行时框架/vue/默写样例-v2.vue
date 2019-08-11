<template>
    route-link  
    <router-view></router-view>
</template>    

<script>
new Vue({
    el:"#app",
    name:"App",
    router:new VueRouter({
        routes:[
            {
                name:"",
                path:"",
                redirect:"",
                component:{
                    template:`<div>
                        <router-view name="childComponent1"></router-view>
                        <router-view name="childComponent2"></router-view>
                    </div>`
                },
                children:[
                    {
                        path:"/child:params1:params2",
                        components:[
                            {
                                childComponent1:{template:"<div>{{$route.params.params1}}</div>"},
                                childComponent2:{template:"<div>{{$route.params.params2}}</div>"},
                            }
                        ]
                    }
                ]
            
            }
        ]
    }),
    component:{}
    template:"<App/>"
})
</script>  