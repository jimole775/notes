# npm
应该不仅是npm，mvn也有这种问题，就是在执行的时候，会把bat程序给终结掉
``` js
rem 安装node依赖，并且build项目
npm install && npm run build

rem 后续操作
copy ... ...
```
以上的程序，“后续操作”将无法执行，原因不清，有可能是npm兼容性的问题？
要修正这个问题，需要使用call命令，让bat以第三方程序的方式运行指定的指令
``` js
rem 安装node依赖，并且build项目
call npm install 
call npm run build
rem 后续操作
copy ... ...
```


