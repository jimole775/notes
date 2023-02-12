# 多线程服务器

# 非阻塞 IO

非阻塞IO：IO操作立即返回，发起线程不会阻塞等待。

非阻塞 read 操作：
- Socket 接收缓冲区有数据，读 n 个（不保证数据被读完整，因此有可能需要多次读）
- Socket 接收缓冲区没数据，则返回失败（不会等待）

非阻塞 write:
- Socket 发送缓冲区满，返回失败（不会等待）
- Socket 发送缓冲区不满，写 n 个数据（不保证一次性全部写入，因此可能需要多次写）

# Java NIO 非阻塞网络方案

# Java IO 和 Java NIO 的比较

# 系统 IO 复用方式：select、poll、epoll