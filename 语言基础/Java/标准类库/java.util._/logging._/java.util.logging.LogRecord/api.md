- `Level [LogRecordObject].getLevel();`
// 获得这个日志记录的记录级别

- `String [LogRecordObject].getLoggerName()`
// 获得正在记录这个日志记录的日志记录器名字

- `ResourceBundle [LogRecordObject].getresourceBundle()`
- `String [LogRecordObject].getresourceBundleName()`
// 获得用于本地化消息的资源包或资源包的名字
// 如果没有获得，则返回null

- `String [LogRecordObject].getMessage()`
// 获得本地化和格式化之前的原始信息

- `Object[] [LogRecordObject].getParameters()`
// 获得参数对象，如果没有获得，则返回null.

- `Throwable [LogRecordObject].getThrown();`
// 获得被抛出的对象，如果不存在，则返回null

- `String [LogRecordObject].getSourceClassName();`
- `String [LogRecordObject].getSourceMethodName();`
// 获得记录这个日志记录的代码区域。
// 这个信息有可能是由日志记录代码提供，也有可能使自动从运行时堆栈推测出来的。
// 如果日志记录代码提供的值有误，或者运行时代码由于被优化而无法推测出确切的位置，这两个方法的返回值就有可能不准确。

- `long [LogRecordObject].getMillis()`
// 获得创建时间。以毫秒为单位（从1970年开始）

- `long [LogRecordObject].getSequenceNumber()`
// 获得这个日志记录的唯一序列号

- `int [LogRecordObject].getThreadId()`
// 获得创建这个日志记录的线程的唯一ID
// 这些ID是由LogRecord类分配的，并且与其他线程的ID无关


