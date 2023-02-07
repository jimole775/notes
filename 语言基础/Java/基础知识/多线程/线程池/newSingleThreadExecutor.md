## newSingleThreadExecutor
`Executors.newSingleThreadExecutor()` 返回一个线程池（这个线程池只有一个线程），**这个线程池可以在线程死后（或发生异常）重新启动一个线程来替代原来的线程继续执行下去**。