# partition结构
- partition是一个文件夹，其中包含多个segment
- 如果其中有n个segment，则共有2*n个文件
- 每个partition是一个有序的队列
- partition中的每条消息都会分配一个有序的id，即offset