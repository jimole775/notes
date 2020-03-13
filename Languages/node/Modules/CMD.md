1. 对于依赖的模块，AMD 是 `提前执行` ，CMD 是 `延迟执行` 。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.

2. CMD 推崇 `依赖就近` ，AMD 推崇 `依赖前置` 。

- template
``` js
define(function(require, exports){
  const a = require('jq')
  // do something

  const b = require('lodash')
  // do something
})
```

- 代表：requirejs