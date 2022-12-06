# topic定义
一个topic，代表逻辑上的一个业务数据集

比如按数据库里不同表的数据操作消息区分放入不同topic

**订单相关操作消息放入订单topic**

**用户相关操作消息放入用户topic**

对于大型网站来说，后端数据都是海量的，订单消息很可能是非常巨量的，比如有几百个G甚至达到TB级别，

如果把这么多数据都放在一台机器上肯定会有容量限制问题，那么就可以在topic内部划分多个partition来分片存储数据

不同的partition可以位于不同的机器上，每台机器上都运行一个kafka的进程Broker

# topic结构

- topic包含多个partition
- topic只是逻辑概念，不涉及到存储，partition才是物理概念
- 同一topic的不同partition可能分布在不同机器上