使用这个API有两个显而易见的好处
### 首先，使用 `async/await` 可以很方便的让 **异步队列** 有序执行

案例场景： 
> 实现爬虫每隔一秒爬取一次数据，避免爬取过快被屏蔽IP
```js 
async function batchFetch(){
    for(let i = 1; i <= 100; i++) {
        await fetching(url += i)
    }
}

batchFetch();

function fetching (path) {
    return new Promise(function(resolve) {
        const req = new RequestHtml()

        const options = {
            protocal:'http:',
            path: path,
            hostname: 'xxx',
            port: 80,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        req.fetch(options, function(htmlChunk) {
            setTimeout(function() {
                resolve() // 每间隔一秒，才resolve
            },1000)
        })
    })   
}

```

### 其次，可以把回调的表达式提取到 await 指令的上下文，方便存取当前域的数据，也方便逻辑梳理

> 假设一个场景：有一个抽象方法，传入一个参数，等待服务器返回一个数据，然后根据参数来改造这个数据，最后返回给后续的逻辑处理。
一般处理这种异步业务有3种方式：

1. 直接把扔进去回调，这种方式不用过多思考，编写简单。
但如果出现多层回调，层层依赖，后期维护的时候却是件非常头疼的事情，也是业内诟病多年的方式。
``` js
    asyncHandler(type, function (res) {
		if (res) function(next) {
			if (next) function() {
				// ...
			}
		}
	});
```

2. 使用 **promise**，代码看上去是平坦了很多。但结果还是需要回调，每次都要包裹在then状态函数里面关联每一个动作的结果，这样导致逻辑关系不是那么清晰。
``` js
    var promise = promiseHandler(type)
    promise.then(function(res) {
    	return res + 1
    })
    .then(function(res) {
    	return res + 1
    })
    .then(function(res) {
    	return res + 1
    })
    .finally(function() {
    	console.log('end')
    })
```

3. 下面应该是 **异步转同步** 的一个理想状态 
``` js  
    var result = handler(type)
    handleResult(result)
```

如果要实现这个 **理想状态**，就必须把这两行全部扔到一个async函数中执行，
也就是说，所有代码都得用一个async函数包起来
```js
    (async function () {
        var prev = 1
        var result = await handler(true)
        handleResult(prev, result) // 输出 2
    })();

    function handler (type) {
        return new Promise(function (resolve, reject) {
            setTimeout(function() {
                if (type) {
                    resolve(1)
                } else {
                    reject(0)
                }
            })
        })
    }

    function handleResult (prev, result) {
        console.log(prev + result)
    }
```
