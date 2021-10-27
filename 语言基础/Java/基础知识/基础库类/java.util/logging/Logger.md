- `Logger [static].getLogger(String loggerName); `
//获取给定名字的日志记录器。
//如果这个日志记录器不存在，自动创建一个。

- `void [LoggerObject].severe(String message)`
- `void [LoggerObject].warning(String message)`
- `void [LoggerObject].info(String message)`
- `void [LoggerObject].config(String message)`
- `void [LoggerObject].fine(String message)`
- `void [LoggerObject].finer(String message)`
- `void [LoggerObject].finest(String message)`
// 记录一个由方法名和给定消息指示级别的日志记录

- `void [LoggerObject].entering(String className,String methodName)`
- `void [LoggerObject].entering(String className,String methodName,Object param)`
- `void [LoggerObject].entering(String className,String methodName,Object[] params)`

- `void [LoggerObject].exiting(String className,String methodName)`
- `void [LoggerObject].exiting(String className,String methodName,Object result)`
// 记录一个描述进入/退出方法的日志记录，其中应该包括给定参数的返回值

- `void [LoggerObject].throwing(String className,String MehodName,Throwable t)`
// 记录一个描述异常给定异常对象的日志记录

- `void [LoggerObject].log(Level level,String message);`
- `void [LoggerObject].log(Level level,String message,Object obj);`
- `void [LoggerObject].log(Level level,String message,Object[] objs);`
- `void [LoggerObject].log(Level level,String message,Throwable t);`
// 记录一个给定级别的消息和日志记录，其中可以包括对象或者可抛出对象。
// 要想包括对象，消息中必须包含格式化占位符{0}，{1}等。

- `void [LoggerObject].logp(Level level,String className,String methodName,String message);`
- `void [LoggerObject].logp(Level level,String className,String methodName,String message,Object obj);`
- `void [LoggerObject].logp(Level level,String className,String methodName,String message,Object[] objs);`
- `void [LoggerObject].logp(Level level,String className,String methodName,String message,Throwable t);`
// 记录一个给定级别、准确的调用者信息、资源包名和消息的日志记录，其中可以包括对象或可抛出对象。

- `Level [LoggerObject].getLevel()`
- `void [LoggerObject].setLevel(Level 1)`
// 获得和设置这个日志记录器的级别

- `Logger [LoggerObject].getParent()`
- `void [LoggerObject].setParent(Level 1)`
// 获得和设置这个日志记录器的父日志记录器

- `Handler[] [LoggerObject].getHandlers()`
// 获得这个日志记录器的所有处理器

- `void [LoggerObject].addHandler(Handler h)`
- `void [LoggerObject].removeHandler(Handler h)`
// 增加或删除这个日志记录器中的一个处理器

- `boolean [LoggerObject].getUseParentHandlers()`
- `void [LoggerObject].setUseParentHandlers(boolean b)`
// 获得和设置 “use parent handler”属性。
// 如果这个属性是true,则日志记录器会将全部的日志记录转发给它的父处理器

- `Filter [LoggerObject].getFilter()`
- `void [LoggerObject].setFilter(Filter f)`
// 获得和设置这个日志记录器的过滤器


