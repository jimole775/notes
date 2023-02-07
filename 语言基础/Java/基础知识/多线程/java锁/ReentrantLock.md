## ReentTrantLock
ReentrantLock 继承接口 Lock 并实现了接口中定义的方法，他时一种可重入锁，除了能完成的所有工作外，还提供了诸如可响应中断锁、可轮询锁请求、定时锁等避免多线程死锁的方法。

ReentrantLock 可用于替代 Synchronized 同步锁。