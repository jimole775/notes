# 线程组

创建线程组

``` java
ThreadGroup group = new ThreadGroup("test"); // 创建线程
Thread thread = new Thread(group, "newThread"); // 往组里新增线程
group.interrupt(); // 中断所有线程
if (group.activeCount == 0) {
    // 判断第一个线程是否在可运行状态
}
```
