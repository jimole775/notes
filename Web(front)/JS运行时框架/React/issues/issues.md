# React对象已经导入，但是Component类的render方法报 "React is not defined";

代码如下:

``` ts
import React,{Component} from "react";

declare const pug:any;
class Home extends Component{
    
    render(){
        return pug`div 测试路由模块导入`; 
    }
}

export default Home;

```

可以看到，第一行导入的方式是比较怪的，这个是从 **react-cli-demo** 里面copy的用法，

单纯的es6是可以解析的，但是，如果项目用到了ts，还有pug，衍生出来的一堆js预处理器，es6转es5的过程可能已经变动

这样的导入方式就会报错，只要修改成普通的import语法就可以了

解决办法:
``` ts
import React from "react";

declare const pug:any;
class Home extends React.Component{
    
    render(){
        return pug`div 测试路由模块导入`; 
    }
}

export default Home;
```
