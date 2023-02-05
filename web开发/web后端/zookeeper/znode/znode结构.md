在 zookeeper 中，可以说 zookeeper 中的所有存储的数据是由 znode 组成的，节点也称为 znode，并以 **key/value** 形式存储数据

整体结构类似于 linux 文件系统的模式，以树形结构存储。根路径以 */* 开头。

使用 `./bin/zkCli.sh` 可以直接进入终端：
``` shell
ls / # ls用于显示节点列表
ls /zookeeper
ls /zookeeper/quota
get /zookeeper/quota # 获取 quota 节点信息
set /zookeeper/quota 1 # 修改 quota 节点
```

# znode 的状态属性
|`cZxid`|创建节点时的事务ID|
|:--|:--|
|`ctime`|创建节点时的时间|
|`mZxid`|最后修改节点时的事务ID|
|`mtime`|最后修改节点时间的时间|
|`pZxid`|表示该节点的子节点列表最后一次修改的事务ID，添加子节点或删除子节点就会影响子节点列表，但是修改子节点的数据内容则不影响该ID（**注意，只有子节点列表变更了才会变更pzxid，子节点内容变更不会影响pzxid**）|
|`cversion`|子节点版本号，每次修改版本号加1|
|`dataversion`|数据版本号，每次修改版本号加1|
|`aclversion`|权限版本号，每次修改版本号加1|
|`ephemeralOwner`|创建该临时节点的会话的sessionID（**如果该节点是持久节点，那么这个属性值为0**）|
|`dataLength`|该节点的数据长度|
|`numChildren`|该节点拥有子节点的数据（**只统计直接子节点的数据**）|
