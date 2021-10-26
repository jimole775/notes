- `String abstract [FormatterObject].format(LogRecord record);`
// 返回对日志记录格式化后的字符串

- `String [FormatterObject].getHead(Handler h);`
- `String [FormatterObject].getTail(Handler h);`
// 返回应该出现在包含日志记录的文档的开头和结尾的字符串。
// 超类Formatter定义了这些方法，他们只返回空字符串。
// 如果必要的话，可以对他们进行重载。

- `String [FormatterObject].formatMessag(LogRecord record);`
// 返回进过本地化和格式化后的日志记录的信息内容。

