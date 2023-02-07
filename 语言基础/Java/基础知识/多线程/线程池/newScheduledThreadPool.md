## newScheduledThreadPool
创建一个线程池，它可安排在给定延迟后运行命令或者定期地执行。
``` java
ScheduledExecutorService scheduledThreadPool = Executors.newScheduledThreadPool(3);

scheduledThreadPool.schedule(newRunnable(){
    @Override
    public void run(){
        System.out.println("延迟3秒");
    }
}, 3, TimeUnit.SECONDS);

scheduledThreadPool.scheduleAtFixedRate(newRunnable(){
    @Override
    public void run(){
        System.out.println("延迟1秒后每3秒执行1次")；
    }
}, 1, 3, TimeUnit.SECONDS);
```
