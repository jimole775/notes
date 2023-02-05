操作分为两种，一种是命令行，一种是java代码
1. 命令行方式，需要进到zookeeper目录，找到 *bin/zkCli.sh*，执行它就可以进入客户端终端控制台

2. java方式，需要引入 **Zookeeper** 包，然后通过 new 获取 Zookeeper 的实例，就可以调用对应的API了（具体API文档，可翻阅）

## ls
查看某个路径下的目录列表

## get
获取某个节点的 **数据** 和 **状态** 信息
``` shell
get /zookeeper/quota watch # 获取 quota 的信息，并开启实时监听
```

## set
用于修改节点 **数据**
``` shell
set /zookeeper/quota 0 1.0 # 1.0属于版本号
set /zookeeper/quota 0 1.1 # 1.1属于版本号
set /zookeeper/quota 0 1.2 # 1.2属于版本号
```


## stat
stat 用于查看节点 **状态** 信息
``` shell
stat /zookeeper/quata watch
```

## create
create 命令用于创建节点并赋值

格式：`create [-s] [-e] path data acl`
- `[-s]`: 可选项，代表顺序节点
- `[-e]`: 可选项，代表临时节点，临时节点不可以创建子节点
- `path`: 绝对路径，必填
- `data`: 数据，必填
- `acl`: 访问权限，默认是 world, 相当于全世界都能访问

## delete
删除节点

格式：`delete path [version]`
