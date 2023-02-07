## Synchronized 同步锁
synchronized 它可以把任意一个非 NULL 的对象当作锁。他属于独占式的悲观锁，同时属于可重入锁。

- Synchronized作用范围
1. 作用于方法时，锁住的是对象的实例（this）;
2. 当作为静态方法时，锁住的时Class的相关数据库存储在永久带 PermGen(jdk1.8则是metaspace), 永久带时全局共享的，因此静态方法锁相当于类的一个全局锁，会锁所有调用该方法的线程；
3. synchronized作用于一个对象实例时，锁住的是所有该对象为锁的代码块。它有多个队列，当多个线程一起访问某个对象监控器的时候，对象监视器会将这些线程存储在不同的容器中。

- Synchronized核心组件
1. Wait Set: 哪些调用 wait 方法被阻塞的线程被放置在这里；
2. Contention List: **竞争队列**，所有请求锁的线程首先被放在这个竞争队列中；
3. Entry List: Contention List 中那些 **有资格称为候选资源的线程被移动到Entry List中**；
4. OnDeck: 任意时刻，最多 **只有一个线程正在竞争锁资源，该线程被称为 OnDeck**;
5. Owner: 当前已经获取到锁资源的线程被称为 Owner;
6. !Owner: 当前释放锁的线程。

- Synchronized实现
1. JVM 每次从队列的尾部取出一个数据用于锁竞争候选者（OnDeck）,但是并发情况下，ContentionList 会被大量的并发线程进行 CAS 访问，为了降低对尾部元素的竞争，JVM 会将一部分线程移动到 EntryLIst 中作为候选竞争线程。

2. Owner 线程会在 unlock 时，将 ContentionList 中的部分线程迁移到 EntryList 中，并指定 EntryList 中的某个线程为 OnDeck 线程（一般是最先进去的那个线程）。

3. Owner 线程并不直接把锁传递给 OnDeck 线程，而是把锁竞争的权力交给 OnDeck, OnDeck 需要重新竞争锁。这样虽然牺牲了一些公平性，但是能极大的提升系统的吞吐量，在 JVM 中，也把这种选择行为称之为“竞争切换”。

4. OnDeck 线程获取到锁资源后会变为 Owner 线程，而没有得到锁资源的仍然停留在 EntryList 中。如果 Owner 线程被 wait 方法阻塞，则转移到 WaitSet 队列中，知道某个时刻通过 notify 或者 notifyAll 唤醒，会重新进入 EntryList 中。

5. 处于 ContentionList, EntryList. WaitSet 中的线程处于阻塞状态，该阻塞是由操作系统来完成的。

6. Synchonized是非公平锁。Synchronized 在线程进入 ContentionList 时，等待的线程会先尝试自旋锁获取锁，如果获取不到就进入 ContentionList, 这明显对于已经进入队列的线程时不公平的，还有一个不公平的事情就是自旋获取锁的线程还可能直接抢占 OnDeck 线程的锁资源。

7. 每个对象都有一个 monitor 对象，**加锁就是在竞争 monitor 对象**，代码块枷锁时在前后分别加上 monitorenter 和 monitorexit 指令来实现的，方法枷锁时通过一个标记来判断的。

8. synchronized 是一个重量级操作，需要调用操作系统相关接口，性能是低效的，由可能给线程加锁消耗的时间比有用操作消耗的时间更多。

9. java1.6, synchronized 进行了很多的优化，**由适应自旋、锁消除、锁粗化、轻量级锁及偏向锁**等，效率有了本质上的提高。

10. 锁可以从偏向锁升级到轻量级锁，再升级到重量级锁。这种升级过程叫做**锁膨胀**。

11. JDK1.6中默认是开启偏向锁的轻量级锁，可以通过 `-XX:-UseBiasedLocking` 来调用偏向锁。