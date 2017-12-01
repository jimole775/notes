/**
 * Created by Andy on 2017/11/11.
 */
//control用来处理$scope模板的数据；
//control可以绑定函数，也可以绑定一个类，也就是说可以共享一个模板
//control可以使用this来存储一些属性，其他的模块（？问题是相同模块下可以还是全局模块都可以）使用require属性来调用
(function(){
    return{
        //...
        require:"^others",  //引入others模板的数据
        controller:function(others){console.log(others)}
    }
})()