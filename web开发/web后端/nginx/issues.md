# windows环境下 `bash: nginx: command not found`
在windows环境，可以逐一测试一下方法：

1. nginx资源的存放路径不要出现中文
2. 然后检查配置的`环境变量`是否正确
3. 如果以上都不行，就先用 cmd 启动 nginx 程序 `start ./nginx`
4. 在任务管理器看到 nginx 进程之后，再执行 `nginx -v` 测试结果


# windows环境下，运行 `start ./nginx` 之后没有启动对应的 nginx 进程

在windows环境，可以逐一测试一下方法：

1. nginx资源的存放路径不要出现中文
2. 可以尝试把 nginx 存放到 `C:\\Program Files` 下面
3. 使用 **管理員** 权限运行

# could not open error log file: CreateFile() "logs/error.log" failed (3: The system cannot find the path specified)

这个就是路径问题，在运行nginx命令行时，应该在 **nginx目录** 下启动。