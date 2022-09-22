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

# vscode 一直提示类型报错，即使安装了 @types/node 和配置了 .d.ts

比如: `Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)`

原因: `@types/node` 中的声明文件 `globals.global.d.ts`，只声明了 global 的命名空间，但是当我们把变量绑到 global 的属性上面时，就会提示属性未定义

- 解决办法：
一般这种情况我们需要自己声明global的属性

命名文件：`global.d.ts`

``` ts
declare global {
  var env: string;
  var business: string;
  var crossEnv: object;
}

export {}
```

然后接下来的重要步骤，就是把声明文件加到 `tsconfig.json` 中

``` json
{
  "include": [
    "global.d.ts" /* 这里用于IDE的类型校验，如果这里不写，那么IDE会一直出现类型报错 */
  ],
  "compilerOptions": {
    "typeRoots": [
      "global.d.ts" /* 用于tsc编译 */
    ]
  }
}
```

# ts-node 无法默认加载 types 声明文件

- 解决办法：
- 1. 命令行可以直接使用 `ts-node --files main.ts`
- 2. 如果是vscpde调试，可以在 `tsconfig` 中加入 `ts-node` 的配置
``` ts
{
  "ts-node": {
    "files": true // 增加这一条配置即可，其他同默认配置
  },
  "include": [
  ],
  "exclude": [
  ],
  "compilerOptions": {
  }
}
```

# error TS1219: Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning

解决：
在IDE中的setting中搜索 experimentalDecorators，并勾选对应的选项

# 'this' implicitly has type 'any' because it does not have a type annotation.
- **问题描述**：当在一个 **function函数** 中使用 this 对象时，会报这个错误
- **解决办法**: 
``` ts
function foo (this: global, p1: string) {
    console.log(this) // output global object
    console.log(p1) // ouput 'foo'
}

foo('foo')
```

# Object is possibly 'undefined'.ts(2532)
- **问题描述**：给变量指定类型的时候，加上了 `?` 或者 `| undefined`
- **解决办法**：访问变量前，加上 `if` 语句就行 

# Type 'string' is not assignable to type 'never'
- **问题描述**：
- **解决办法**：
- 1. 首先需要查看一下是否有重复定义的类型，一般出现在参数和原型重名的情况

# Cannot redeclare block-scoped variable 'xxx'.ts(2451)
- **问题描述**:
当ts在编译阶段，tsc会把我们声明的变量、具名函数、class都放在了全局作用域，在生成js文件后，js文件里的变量、函数、class会跟ts文件的重复
- **解决办法**:
1. 把 module.exports<commonjs> 改为 export<es6> /** 推荐 */
2. 直接修改变量名 /** 这样做会导致变量冗余 */
3. 把变量定义放在入口模块，直接当作全局变量使用 /** 这样做会导致单元测试比较麻烦 */
4. 在单模块的顶部使用`export {}` /** 不建议，因为这样会让模块看起来比较怪 */

# Type '{}' is missing the following properties from type 'xxx': xx, xxxx, xxxxxxx, xxxxxx, and 79 more.ts(2740)
- **问题描述**:
在一个类中，当一个变量被声明了**特定类型**(非普通的 object, number....，有可能是自定义类型，或第三方类库的类型)，在 constructor 初始化的时候，给它赋值字面量数据就会报错

- **解决办法**:
1. 使用 **联合类型** 对变量进行声明
2. 使用 **强制转换** 来对变量进行初始化
``` ts
class A {
  public b: Type | {} // 方法1
  constructor () {
    this.b = {} as Type // 方法2
  }
}
```
