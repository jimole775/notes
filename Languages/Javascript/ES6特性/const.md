# const和let的语法规则基本相同
- 不过const的常量特性只是拒绝对【内存地址】的修改，但是对于其指向的对象就无能为力，
- 这时候，就需要用到Object.freeze()方法

``` js
    const foo = "bar";
    Object.freeze(foo);
    foo.prop = "baz";	//uneffect;
```

- 但是，上面的方法对于属性的属性又不起作用，那么，只能对常量进行绝对冻结了
``` js
    const deepFreeze = (obj) => {
    	Object.keys(obj).forEach((prop)=>{
    		if(typeof obj[prop] === "object"){
    			deepFreeze(obj[prop])
    		}
    	});
    };
```

- 简单总结
如果使用const, 后面不能再使用 = 号再次赋值
``` js
  const arr = []
  arr = [] // error
  arr.push(1) // checked
  const num = 1
  num = 2 // error
```
