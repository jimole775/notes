# beforeExit 事件

# process.argv

# process.stdout

# process.stderr

# process.pid

# process.on

# process.send

# child_process
## 让父进程退出
``` js
var child_process = require('child_process');
var child = child_process.spawn('node', ['child.js'], {
    detached: true,
    stdio: 'ignore'  // 备注：如果不置为 ignore，那么 父进程还是不会退出
    // stdio: 'inherit'
});

child.unref();
```


https://www.cnblogs.com/chyingp/p/node-learning-guide-child_process.html

https://www.runoob.com/nodejs/nodejs-global-object.html