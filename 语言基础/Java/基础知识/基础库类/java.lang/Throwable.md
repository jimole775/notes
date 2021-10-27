> `Throwable excep = new Throwable("try exception!");`

- `excep.toString()`
构造一个新的Throwable对象，这个对象没有详细的描述信息。

- `excep.getMessage()`
获取对象的详细描述信息

- `excep.getStackTrace()`
返回一个StackTraceElement, 可以用于分析堆栈信息

> Throwable可以修饰所有的错误类型，相当于Throwable是所有错误的超类
