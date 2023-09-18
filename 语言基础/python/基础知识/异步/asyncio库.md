# 3.8 以前的常用方式

## 1. asyncio.get_event_loop | loop.wait | loop.run_until_complete | loop.close

## 2. asyncio.get_event_loop | loop.create_task | loop.run_until_complete | loop.close

# 3.8以后常用的方法就三个：

## asyncio.run()

- 直接运行协程函数
``` py
import asyncio
def main(func):
    if asyncio.iscoroutinefunction(func):
        asyncio.run(func()) # 如果是协程，使用 run 方法运行
    else:
        func()

async def asyncFunc():
    await asyncio.sleep(1)

main(asyncFunc)
```

## asyncio.create_task()
- 创建task，一般都是用来创建 tasks 队列
``` py
import asyncio
async def func():
    await asyncio.sleep(1)

async def main():
    tasks = []
    for i in range(1, 4): # 为了测试，创建3条协程任务
        tasks.append(asyncio.create_task(func()))
    for task in tasks: # 循环等待就好
        await task
asyncio.fun(main())
```

## asyncio.gather()
- 获取返回值
``` py
import asyncio
async def func():
    await asyncio.sleep(1)

async def main():
    tasks = []
    for i in range(1, 4): # 为了测试，创建3条协程任务
        tasks.append(asyncio.create_task(func()))
    res = await asyncio.gather(tasks[0], tasks[1], tasks[2])
    return res

asyncio.run(main())
```