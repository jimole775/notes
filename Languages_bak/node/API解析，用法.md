``` js
    http.createServer(function(require,response){
        response.writeHead(200,{"Contents-Type":"text/html"});
        response.end("resEnd");
    }).listen([netPort])
```

# 实时刷新工具

安装：
``` bash
npm install -g supervisor
```
使用：
``` bash
supervisor app.js
```


# 文件阻塞式读取
``` js
    var fs = require('fs');
    var data = fs.readFileSync('file.txt', 'utf-8');
    console.log(data);
    console.log('end.');
```

# 文件异步式读取
``` js
    var fs = require('fs');
    fs.readFile('file.txt', 'utf-8', function(err, data) {
        if (err) {
        console.error(err);
        } else {
        console.log(data);
        }
    });
    console.log('end.')
```

# 包和模块

- 一个模块就是一个文件

通常node提供了exports和require方法来关联不同文件的模块(webpack就是这个机制，用node做中间层);
1. (A.js) exports.setName = function(){console.log("get me")}
2. (B.js) var getModule = require('./A');getModule .setName();

- 区别exports和Module.exports

一般情况下，用exports来导出一个属性；用Module.exports导出一个对象

包是在模块的基础上更深一步的抽象，可以是单个模块，也可以是多个模块的集成：

发布包的步骤--

