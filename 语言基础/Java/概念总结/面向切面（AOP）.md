
## AOP的基本概念
- `切面（Aspect）`: 类似于OOP中的Class，一个Aspect存放一个系统功能的所有逻辑；在ApplicationContext中aop:aspect来配置
- `连接点（Joinpoint）`: 程序执行过程中的某一事件，如方法被调用时、抛出异常时
- `切入点（Pointcut）`: 它是一个表达式，用于确定哪些类的哪些函数需要插入横切逻辑；它只精确到函数，究竟要在函数执行的哪个阶段插入横切逻辑，这就由通知的类型决定
- `通知（Advice）`: 具体的横切逻辑

## Spring中有四种Advice：
1. 前置通知（Before Advice）
2. 后置通知（After Advice）
3. 返回通知（After Return Advice）
4. 环绕通知（Around Advice）
5. 抛出异常后通知（After Throwing Advice）
