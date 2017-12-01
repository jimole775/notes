/**
 * Created by Andy on 2017/11/12.
 */
//最重要的一点:::::directive的模板名在js中使用 "驼峰" 法的时候,在html里面一定要用 "-" 进行匹配,
//比如:

angular.module("app",[]).directive("myHead",function(){});


//那么,在html里面必须是这样

String("<my-head></my-head>");

//否则,就不运行,也不报错

//这就是折腾了12个小时焦头烂额的后果~~