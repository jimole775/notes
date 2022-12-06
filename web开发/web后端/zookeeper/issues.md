# Error contacting service. It is probably not running.
- **背景**:
根据《菜鸟教程》，在 birtualbox环境下配置出现的错误，这个情况有可能由不同的原因造成，所以，需要根据相应的情况进行排查，具体根据配置的 `dataDir="/opt/zookeeper"`找到 **zookeeper.out** 文件进行对应的排查。

- **原因**：
1. java未安装，或者安装的方式或者版本不对

2. 其他服务器的机器未配置完成，或者网络不通，端口不通

3. 未配置zookeeper的myid

4. 在 virtualbox 环境，**zookeeper.out** 没有特别的报错信息

- **解决**：
1. 在当前环境安装jdk，**最重要的是，必须配置好环境变量**

2. 一般在 **zoo.cfg** 中配置对应的 `server.x=192.xxx.xxx.xxx:2888:3888` 后，需要所有服务器启动之后，然后谁第一个调用 `zkServer.sh start`，谁就是 **leader** 机，保持网络端口通畅的方法，要不关闭防火墙 `systemctl stop firewalld`，要不就是开通对应的端口

3. 需要根据 **zoo.cfg** 中的配置来创建对应的 **myid**
``` config
dataDir=/tmp/zookeeper
server.1=192.168.56.11:2888:3888
```
这个配置中的 myid就是1，并且存储路径是 */tmp/zookeeper*，那么接下来就在 */tmp/zookeeper* 下创建 myid 文件就OK了
``` bash
cd /tmp
mkdir zookeeper # 保证文件夹存在
echo 1 > myid # 创建 myid 文件，内容为 "1"
```

4. 可以尝试重启服务器试试

# Error: Connection refused

- **背景**:

在服务端配置好 zookeeper 环境并启动服务之后，通过客户端进行连接访问，会出现此问题

- **原因**：
1. 有可能是服务器的防火墙问题，端口号没打开

2. 有可能是工作网络对外部 IP 有访问限制

3. 有可能是幅度段只监听了 **ipv6** 的端口，**ipv4** 的访问无任何响应

4. **virtualbox** 的网卡配置导致宿主机无法访问虚拟机

- **解决**：

1. 可以先尝试直接关闭防火墙试试，`systemctl stop firewalld.service`

2. 使用 **telnet** 去探测目标主机端口，就可以判断链路是否通畅

3. 可以通过 `netstat -anp|grep 2181` 查看 zookeeper 监听的 2181 的端口的协议类型，开头是 **tcp** 的就是 **ipv4**，开头是 **tcp6** 的就是 **ipv6**，可以查找文档，如何开启 **ipv4**，或者直接使用 **ipv6** 就可以了

4. 根据网卡配置规则，去重新调整网卡信息，可以参考 [本地文档](F:\notes\操作系统\linux\virtualbox\网卡配置.md)