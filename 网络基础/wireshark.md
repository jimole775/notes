# 常用过滤语法

## 过滤 ip
1. `ip.dst == 'xxxx'` 只显示 目标IP（数据包的接收地址）为 xxxx 的请求
2. `ip.src == 'xxxx'` 只显示 源IP（数据包发起地址，即本机的ip）为 xxxx 的请求
3. `ip.addr == 'xxxx'` 只显示包含ip为 xxxx 的请求

## 过滤包类型
1. `http` 只显示 http 类型的请求
2. `tcp` 只显示 tcp 类型的请求
3. `udp` 只显示 tcp 类型的请求
4. `dns` 只显示当前通过 dns 转发的请求，一般想知道指定某个域名的ip，可以通过这个过滤指令来查看
   
5. `tcp.port == 443` 只显示端口号为 443 的 tcp 数据包
6. `udp.srcport == 443` 只显示 源端口号 为 443 的 udp 数据包
7. `tcp.srcport == 443` 只显示 源端口号 为 443 的 tcp 数据包
8. `udp.dstport == 443` 只显示 目标端口号 为 443 的 udp 数据包
9. `tcp.dstport == 443` 只显示 目标端口号 为 443 的 tcp 数据包
