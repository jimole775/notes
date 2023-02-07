# Lock接口的主要方法

1. `boid lock()`: 执行此方法时，**如果所处于空闲状态，当前线程将获取到锁**。相反，如果锁已经被其他线程持有，将禁用当前线程，直到当前线程获取到锁。

2. `boolean tryLock()`: **如果锁可用，则获取锁，并立即返回true，否则返回false**。该方法和 `lock()` 的区别在于，不会导致当前线程被禁用，当前线程仍然继续往下执行代码。而 `lock()` 方法则是一定要获取到锁，如果锁不可用，就一直等待，在未获得锁之前，当前线程并不继续向下执行。

3. `void unlock`: 执行此方法时，**当前线程将释放持有的锁**。锁只能由持有者释放，如果线程并不持有锁，却执行该方法，可能导致异常发生。

4. `Condition NewCondition()`: **条件对象，获取等待通知组件**。该组件和当前的锁绑定，当前线程只有获取了锁，才能调用该组件的 `await()` 方法，而调用后，当前线程将释放锁。

5. `getHoldCount()`: 查询当前线程保持此锁的次数，也就是调用 lock 方法的次数。

6. `getQueueLength()`: 返回正等待获取此锁的线程估计数，比如启动10个线程，1个线程获得锁，此时返回的是9.

7. `getWaitQueueLength`: (Condition condition)返回等待与此锁有关的给定条件的线程估计数。比如10个线程，用同一个condition对象，并且此时这10个线程都执行了 condition 对象的 await 方法，那么此时执行此方法返回 10.

8. `hasWaiters(Condition condition)`: 查询是否有线程等待与此锁有关的给定条件(condition), 对于指定 condition 对象，有多少线程执行了 condition.await 方法。

9. `hasQueuedThread(Thread thread)`: 查询给定线程是否等待获取此锁。

10. `hasQueuedThreads()`: 是否有线程等待此锁。

11. `isFair`: 该锁是否是公平锁。

12. `isHeldByCurrentThread`: 当前线程是否保持锁的锁定，线程的执行lock方法的前后分别是 false 和 true.

13. `isLock()`: 此锁是否有任意线程占用。

14. `lockInterruptibly`: 如果当前线程未被中断，获取锁。

15. `tryLock()`: 尝试获取锁，仅在调用时锁未被线程占用，获得锁。

16. `tryLock(long timeout TimeUnit unit)`: 如果锁在给定等待时间内没有被另一个线程保持，则获取该锁。