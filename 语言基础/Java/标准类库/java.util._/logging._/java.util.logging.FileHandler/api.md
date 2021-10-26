``` java
new FileHandler(String pattern);
new FileHandler(String pattern,boolean append);
new FileHandler(String pattern,int limit,int count);
new FileHandler(String pattern,int limit,int count,boolean append);
```
// 构造一个文件处理器
// @pattern 构造日志文件名的模式
// @limit 在打开一个新日志文件之前，日志文件可以包含的近似最大字节数
// @count 循环序列的文件数量
// @append 新构造的文件处理器对象应该追加一个已存在的日志文件尾部为true