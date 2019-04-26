# Property 'xxx' does not exist on type 'xxx';
一般这种错误都是出现未申明的变量造成的

如果是 **类** 里面，this对象类型的缺失，就必须在当前上下文，重新申明一个接口对象了

比如:
``` ts
    interface Example{
        name:any;        
    } 

    class Example{
        getName(){
            return this.name = "Rongxis";
        }
    }
```

如果是非当前上下文的外部模块，必须先得到它的类型，有两种方式:
1. 导入模块
2. 声明类型（需要使用 **declare** 关键字）

比如:
``` ts
    import React from "react";
    declare const pug:any; //声明pug类型
    class Home extends React.Component{
        
        render(){
            return pug`div 测试路由模块导入`; 
        }
    }
```
