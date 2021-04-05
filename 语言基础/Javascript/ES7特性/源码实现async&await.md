``` js
// 这是我们的异步生成器
var asyncFunc = _asyncToGenerator(
// regeneratorRuntime 这个对象是 迭代器的运行时，mark函数 将所有的变量保存在它作用域下
regeneratorRuntime.mark(function _callee() {
  var a, d, b, c;
  // wrap 是对下面代码片段的一个包裹函数，每执行一次迭代就会调用一次 _callee$
  // _context.next, 执行完本次迭代后将指针指到下一个迭代
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // --------- ⬇⬇ 这是第一个代码片段 ⬇⬇ -----------
          console.log(1);
          _context.next = 3;
          return new Promise(function (resolve) {
            setTimeout(function () {
              resolve();
              console.log('sleep 1s');
            }, 1000);
          });
          // --------- ⬆⬆ 这是第一个代码片段 ⬆⬆ -----------
        case 3:
          // --------- ⬇⬇ 这是第二个代码片段 ⬇⬇ -----------
          console.log(2);
          _context.next = 9;
          return Promise.resolve('a');
          // --------- ⬆⬆ 这是第二个代码片段 ⬆⬆ -----------
          // ...
          // ... 下面以此类推每一个 yield 会被放进一个 case，作为一个代码片段，
          // ... 每次执行完就return，并且将 _context.next 指向下一个
          // ... 等待下次调用
        case 9:
          d = _context.sent;
          console.log(3);
          _context.next = 13;
          return Promise.resolve('b');

        case 13:
          b = _context.sent;
          _context.next = 16;
          return Promise.resolve('c');

        case 16:
          c = _context.sent;
          return _context.abrupt("return", [a, b, c, d]);

        case 18:
        case "end":
          // 最后执行 stop 结束
          return _context.stop();
      }
    }
  }, _callee);
}));

asyncFunc().then(function (res) {
  console.log(res);
});
```
