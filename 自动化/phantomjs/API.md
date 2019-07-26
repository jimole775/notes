# Child Process模块
这是phantom提供的调用外部程序的接口，因为phantom本身的功能有限（比如缺少http模块），有了这个才能保证一个爬虫的完整性

- 交互
``` js
    // phantom.js
    var child = require('child_process')
    child.excFile('node', ['./main.js', 'hello world'], '', function(err, stdout, stderr){
        console.log(stdout) // 被调用的程序的输出数据
    })
```
``` js
    // main.js
    var input = process.argv[process.agv.length - 1]
    console.log(input) // 输出 hello world
    process.stdout.write('run over') // 输出数据
```

# fs模块
fs和nodejs的fs相比，功能显然少了很多，但是封装的相对较好，基本够用

- 写入内容
```js
var fs = require('fs')
fs.write('a.txt','helloworld','w')
```

- 插入内容
```js
var fs = require('fs')
 // 这种方式，反复执行代码，会无限插入重复数据
 // 使用这种方式的话，就需要先判断是否存在文件，存在的话先删除，再插入
fs.write('a.txt','helloworld','a')
```
