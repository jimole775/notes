# 背景
vue-cli@3 版本打包的时候，会出现内存不足的情况

> 一般情况下，x64的系统，v8引擎的单个线程容量极限在 1.4G；x32的系统，极限在0.7G

# 解决
可以安装 ```increase-memory-limit``` 和 ```cross-env```，两个包，在运行打包程序的时候，先执行两个包

``` js
  "scripts": {
    "serve": "npm run freeMemory && vue-cli-service serve",
    "build": "npm run freeMemory && vue-cli-service build",    
    "freeMemory": "cross-env LIMIT=4096 increase-memory-limit",
  },
    "devDependencies": {
        "increase-memory-limit": "^1.0.3",
        "cross-env": "^5.0.5"
    }
```

两个包的原理，其实就是修改 node_modules/.bin/ 下面的node的配置文件，如果不使用第三方包，也可以手动修改，修改方法暂时不在这里讨论

