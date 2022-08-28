# Property 'xxx' does not exist on type 'xxx';
一般这种错误都是出现未申明的变量造成的

如果是 **类** 里面，this对象类型的缺失，就必须在当前上下文，重新申明一个接口对象了

比如:
``` ts
    interface Example {
        name: any
    }

    class Example {
        getName () {
            return this.name = "Rongxis"
        }
    }
```

如果是非当前上下文的外部模块，必须先得到它的类型，有两种方式:
- 1. 导入模块
- 2. 声明类型（需要使用 **declare** 关键字）

比如:
``` ts
    import React from "react"
    declare const pug:any // 声明pug类型
    class Home extends React.Component {
        render () {
            return pug`div 测试路由模块导入`
        }
    }
```

# "XXX" module is not defined;

说明一下，这种BUG出现为，module已经正确导入，
但是在组件中使用pug语法的时候，module未被正确调用，
估计这个pug是一个运行时插件，只有在运行到当前行的时候，
才去把字符串解析成jsx的虚拟dom，pug语法包裹的字符串是不经过预编译程序的

所以，现在阶段，如果要使用ts的，就不要使用pug，反之亦然。

# tsc : 无法加载文件 C:\nodejs\tsc.ps1，因为在此系统上禁止运行脚本。
主要是 `npm install -g ts-node typescript` 的时候出现的问题
原因是vscode中powershell的权限问题，需要使用`管理员权限`启动powershell，运行指令 `Set-ExecutionPolicy RemoteSigned`

# vscode 一直提示语法报错，即使安装了 @types/node 和配置了 .d.ts

如果tsc能正常编译ts文件，但是vscode一直提示类型报错，那么可以把ts的校验设置给去掉

在vscode的setting界面搜索 `Typescript Validation`，去掉勾选就行
