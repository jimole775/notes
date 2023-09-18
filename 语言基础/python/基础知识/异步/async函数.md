运行 async 函数之后，会获取协程对象，再使用 send() 方法，获取协程函数返回的值

这是在不适用 asyncio 库的情况下的协程使用，但具体是应用在哪种业务场景，不好体现

``` py
async def func():
    return 1

def main():
    try:
        return func().send(None)
    except StopIteration as r:
        return r.value

print(main())
```