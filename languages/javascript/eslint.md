
# .eslintrc.js
``` javascript
module.exports = {
 //一旦配置了root，ESlint停止在父级目录中查找配置文件
 root: true,
 //解析器
 parser: "babel-eslint",
 //想要支持的JS语言选项
 parserOptions: {
  //启用ES6语法支持(如果支持es6的全局变量{env: {es6: true}}，则默认启用ES6语法支持)
  //此处也可以使用年份命名的版本号：2015
  ecmaVersion: 6,
  //默认为script
  sourceType: "module",
  //支持其他的语言特性
  ecmaFeatures: {
   //...
  }
 },
 //代码运行的环境，每个环境都会有一套预定义的全局对象，不同环境可以组合使用
 env: {
  es6: true,
  browser: true,
  jquery: true
 },
 //访问当前源文件中未定义的变量时，no-undef会报警告。
 //如果这些全局变量是合规的，可以在globals中配置，避免这些全局变量发出警告
 globals: {
  //配置给全局变量的布尔值，是用来控制该全局变量是否允许被重写
  test_param： true
 },
 //支持第三方插件的规则，插件以eslint-plugin-作为前缀，配置时该前缀可省略
 //检查vue文件需要eslint-plugin-vue插件
 plugins: ["vue"],
 //集成推荐的规则
 extends: ["eslint:recommended", "plugin:vue/essential"],
 //启用额外的规则或者覆盖默认的规则
 //规则级别分别：为"off"(0)关闭、"warn"(1)警告、"error"(2)错误--error触发时，程序退出
 rules: {
  //关闭“禁用console”规则
  "no-console": "off",
  //缩进不规范警告，要求缩进为2个空格，默认值为4个空格
  "indent": ["warn", 2, {
   //设置为1时强制switch语句中case的缩进为2个空格
   "SwitchCase": 1,
   //分别配置var、let和const的缩进
   "VariableDeclarator": { "var": 2, "let": 2, "const": 3 }
  }],
  //定义字符串不规范错误，要求字符串使用双引号
  quotes: ["error", "double"],
  //....
  //更多规则可查看http://eslint.cn/docs/rules/
 }
}
```
# 常用规范
``` bash
"no-console": "error", 　　　　　　　　　　　　　　　　 // 禁止console
"no-alert": "error", 　　　　　　　　　　　　　　　　　 // 禁止alert,conirm等
"no-debugger": "error", 　　　　　　　　　　　　　　　 // 禁止debugger
"semi": ["error", "never"],　　　　　　　　　　　　   // 禁止分号
"no-tabs": "error", 　　　　　　　　　　　　　　　　　　// 禁止使用tab
"no-unreachable": "error", 　　　　　　　　　　　　　　// 当有不能执行到的代码时
"eol-last": "error", 　　　　　　　　　　　　　　　　　　// 文件末尾强制换行
"no-new": "error",　　　　　　　　　　　　　　　　　　　 // 禁止在使用new构造一个实例后不赋值
"quotes": ["error", "backtick"], 　　　　　　　　　　 // 引号类型 `` "" ''
"no-unused-vars": ["error", { "vars": "all", "args": "after-used" }], 　　// 不能有声明后未被使用的变量
"no-trailing-spaces": "error", 　　　　　　　　　　　　// 一行结束后面不要有空格
"space-before-function-paren": ["error", "never"], // 函数定义时括号前面要不要有空格
"no-undef": "error", 　　　　　　　　　　　　　　　　　　// 不能有未定义的变量,定义之前必须有var或者let
"curly": ["error", "all"], 　　　　　　　　　　　　　　 // 必须使用 if(){} 中的{}
'arrow-parens': "error", 　　　　　　　　　　　　　　　　// 箭头函数的参数要有()包裹
'generator-star-spacing': "error", 　　　　　　　　　　// allow async-await
"space-before-function-paren": ["error", "never"],  // 禁止函数名前有空格，如function Test (aaa,bbb)
"space-in-parens": ["error", "never"], 　　　　　　　　// 禁止圆括号有空格，如Test( 2, 3 )
"space-infix-ops": "error", 　　　　　　　　　　　　　　//在操作符旁边必须有空格， 如 a + b而不是a+b
"space-before-blocks": ["error", "always"], 　　　　　// 语句块之前必须有空格 如 ) {}
"spaced-comment":["error", "always"], 　　　　　　　　// 注释前必须有空格
"arrow-body-style": ["error", "always"], 　　　　　　// 要求箭头函数必须有大括号 如 a => {}
"arrow-parens": ["error", "always"], 　　　　　　　　//要求箭头函数的参数必有用括弧包住，如(a) =>{}
"arrow-spacing": ["error", { "before": true, "after": true }], // 定义箭头函数的箭头前后都必须有空格
"no-const-assign": "error",  　　　　　　　　　　　　  // 禁止修改const变量
"template-curly-spacing": ["error", "never"], 　　// 禁止末班字符串中的{}中的变量出现空格，如以下错误`${ a }`
"no-multi-spaces": "error", 　　　　　　　　　　　　// 禁止多个空格，只有一个空格的地方必须只有一个
"no-whitespace-before-property": "error", 　　　　// 禁止属性前有空格，如obj. a
"keyword-spacing":["error",{"before": true, "after": true}]　　 //关键字前后必须有空格 如 } else {
```
