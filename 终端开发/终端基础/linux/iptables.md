## 一、iptables中的“四表五链”及“堵通策略”
### 1. **四表**，iptables的功能--filter, nat, mangle, raw
- `filter` 控制数据包是否允许进出及转发(INPUT、OUTPUT、FORWARD)，可以控制的链路有input, forward, output
- `nat` 控制数据包中地址转换，可以控制的链路有prerouting, input, output, postrouting
- `mangle` 修改数据包中的元数据，可以控制的链路有prerouting, input, forward, output, postrouting
- `raw` 控制nat表中连接追踪机制的启用状况，可以控制的链路有prerouting, output
> 注：在centos7中，还有security表，不过这里不作介绍
### 2. **五链**，是指内核中控制网络的NetFilter定义的五个规则链
- `PREROUTING` 路由前
- `INPUT` 数据包六入口
- `FORWARD` 转发管卡
- `OUTPUT` 数据包出口
- `POSTROUTING` 路由后
### 3. **堵通策略**，是指对数据包所做的操作，一般有两种操作--“通(ACCEPT)”、“堵(DROP)”，还有一种常见的REJECT
## 二、iptables命令的语法规则
语法
``` bash
iptables [-t table] COMMAND [chain] CRETIRIA -j ACTION
# `-t table`, 是指操作的表, filter, nat, mangle, raw, 默认使用filter
# `COMMAND`, 子命令, 定义对规则的管理
# `chain` 指明链路
# `CRETIRIA` 匹配的条件或标准
# `ACTION` 操作动作 
```
比如, 不允许10.8.0.0/16网络对80/tcp端口进行访问
``` bash
iptables -A INPUT -s 10.8.0.0/16 -d 172.16.55.7 -p tcp --dport 80 -j DROP
```
查看iptables列表
``` bash
iptables -nL
```
## 三、链管理
- `-N, --new-chain chain`: 新建一个自定义的规则链
- `-X, --delete-chain [chain]`: 删除用户自定义的引用计数为0的空链
- `-F, --flush [chain] [chain]`: 清空指定的规则链上的规则
- `-E, --rename-chain old-chain new-chain`: 重命名链
- `-Z, --zero [chain [rulenum]]`: 置零计数器
- `-P, --policy chain target`: 设置链路的默认策略
## 四、规则管理
- `-A, --append chain rule-specification`: 追加新规则于指令链的尾部
- `-I, --insert chain [rulenum] rule-specification`: 插入新规则于指定链的指定位置，默认为首部
- `-R, --replace chain rulenum rule-specification`: 替换指定的规则为新的规则
- `-D, --delete chain rulenum`: 根据规则编号删除规则
## 五、查看规则
- `-L, --list [chain]`: 列出规则
- `-v, --verbose`: 详细信息
- `-n, --numeric`: 数字格式显示主机地址和端口号
- `-x, --exact`: 显示计数器的精确值
- `--line-numbers`: 列出规则时，显示其在链上的相应的编号
- `-S, --list-rules [chain]`: 显示指定链的所有规则
## 六、匹配条件
匹配条件包括通用匹配条件和扩展匹配条件。

通用匹配条件是指针对源地址、目标地址的匹配，包括单一源IP、单一源端口、单一目标IP、单一目标端口、数据包流经的网卡以及协议。

扩展匹配条件指通用匹配之外的匹配条件。

### 1. 通用匹配条件
- `-s, --source address[/mask][,...]`: 检查报文的源IP地址是否符合此处指定的范围，或是否等于此处给定的地址；
- `-d, --destination address[/mask][,...]`: 检查报文的目标IP地址是否符合此处指定的范围，或是否等于此处给定的地址
- `-p, --protocol protocal`: 匹配报文中的协议，可用值tcp,udp,udplite,icmp,icmpv6,esp,ah,sctp,mh或者"all",亦可以数字格式指明协议
- `-i, --in-interface name`: 限定报文仅能够从指定的接口流入
- `-o, --out-interface name`: 限定报文仅能够从指定的接口流出
### 2. 扩展匹配条件
#### 2.1 隐含扩展匹配条件
- `-p tcp`: 可直接使用tcp扩展模块的专用选项

- ``
