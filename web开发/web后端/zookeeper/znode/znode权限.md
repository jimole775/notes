ACL(Access Control List) 访问控制表，可以针对节点设置相关读写权限，保证数据安全。

## ACL 命令行
- **getAcl**：获取某个节点的 acl 权限信息
- **setAcl**：设置某个节点的 acl 权限信息
- **addauth**：输入认证权限信息，注册时输入明文密码，加密形式保存

## ACL 构成
zookeeper 的 acl 通过 [scheme:id:permissions] 来构成权限列表。

- **scheme**：代表采用的某种权限机制，包括`world`、`auth`、`digest`、`ip` 几种
- **id**：代表允许访问的用户
- **permissions**：权限组合字符串，由 `cdrwa` 组成，其中每个字母代表支持不同权限，创建权限 `create`(c)、删除权限 `delete`(d)、读权限 `read`(r)、写权限 `write`(w)、管理权限 `admin`(a)

## 权限机制：world 用例
**world** 代表开放式权限，此时 **id** 只能是 **anynoe**。
``` shell
getAcl /zookeeper/quota
setAcl /zookeeper/quota world:anyone:crwa # 没有给与删除权限
delete /zookeeper/quota # 这里删除失败
```

## 权限机制：auth 用例
**auth** 代表已经通过了认证的用户。
``` shell
setAcl /zookeeper/quota auth:user1:123456:cdrwa # 会报错
addauth digest user1:123456 # 新增一个以校验用户到列表
setAcl /zookeeper/quota auth:user1:123456:cdrwa # 不再报错
getAcl /zookeeper/quota
```

## 权限机制：digest 用例
**digest** 使用用户名+密码来做校验。
``` shell
create /runoob runoob
getAcl /runoob # 返回默认的权限列表
setAcl /runoob digest:user1:123456:cdrwa
```

## 权限机制：ip 用例
**ip** 只允许某些特定的IP访问ZNode
``` shell
create /runoob/ipnode 0
getAcl /runoob/ipnode
setAcl /runoob/ipnode ip:192.168.3.7:cdrwa
get /runoob/ipnode
```
