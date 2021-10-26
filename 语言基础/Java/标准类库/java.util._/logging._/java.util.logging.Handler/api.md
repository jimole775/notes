- `abstract void publish(LogRecord record)`
// 将日志记录发送到希望的目的地

- `abstract void flush()`
// 刷新所有已缓冲的数据

- `abstract void close()`
// 刷新所有已缓冲的数据，并释放所有相关资源

- `Filter getFilter()`
- `void setFileter(Filter f)`
// 获得和设置这个处理器的过滤器

- `Formatter getFormatter()`
- `void setFormatter(Formatter f)`
// 获得和设置这个处理器的格式化器

- `Level getLevel()`
- `void setLevel(Level 1)`
// 获得和设置这个处理器的级别

