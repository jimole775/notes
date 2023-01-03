# The guest machine entered an invalid state while waiting for it to boot.

这种情况一般是在重新 vagrant up 的时候，上一次的 vm 没有清理干净。

一般可以找到 Vagrantfile 的同级目录有一个名为 `.vagrant/` 的文件夹，里面的内容必须全部删除，vagrant up 指令会重新给与生成

# 卡在 Rsyncing folder: /cygdrive/f/ => /vagrant

这种不算问题，当前步骤只是把 Vagrantfile 文件的 **同级的目录的所有文件** 同步到 vm 系统中的 */vagrant* 目录，方便在 vm 环境中对 vagrant 的数据进行访问

只要把 Vagrantfile 放到单独的文件下，就不会出现长时间的卡顿问题了

# 使用通一个 Vagrantfile 文件去创建多个 VM，有可能会出现 issues 3 的问题

当前的解决手段，只能是分开多个 Vagrantfile 去创建，由于在官方文档处没找到 `vagrant up` 指令可以指定 Vagrantfile 的方法，所以，出现这种情况，只能用文件夹把多个 Vagrantfile 文件隔离开，再单独使用 `vagrant up` 进行调用

# vm 无法设置共享文件夹，报"mount: unknown filesystem 'vboxsf'"
- **背景**:

为了宿主机和客户机文件互传方便，必须要设置一个共享文件夹在 virtualbox 界面程序上，设置共享文件夹后，发现系统中根本没有挂载对应的文件

- **原因**:

运行mount指令，会报 **mount: unknown filesystem type 'vboxsf'** 的错误，

其主要原因就是没有加载光驱，让光驱去读取共享文件夹的数据

- **解决**:
1. 先在虚拟盒子上设置 iso 光驱

2. 接下来，安装几个插件工具

``` shell
yum install -y kernel kernel-devel kernel-headers gcc make
```

3. 安装完之后进行 reboot

4. 重启后，挂载光驱
``` shell
mkdir /media/cdrom # 创建cdrom文件要存储的位置
lsscsi # 查看虚拟设备映射的位置
mount /dev/sr0 /media/cdrom # 把光盘文件挂载到 /media/cdrom
```

5. 接下来进到 *cdrom* 运行光盘文件
``` shell
cd /media/cdrom
./VBoxLinuxAdditions.run
```

6. 然后访问设置的共享文件路径，就有文件了

- **参考**:
http://t.zoukankan.com/zhengchuzhou-p-9607556.html
http://t.zoukankan.com/hafiz-p-9174951.html

# D-Bus not installed

# vm 无法使用鼠标

# 宿主机和虚拟机的端口不能互通
- **背景**:
在配置 zookeeper 的时候，需要开放 2181 2888 3888 的端口，用来测试 zookeeper 的功能，
但是在所有工序都完成的时候，最终在宿主机访问虚拟机的阶段，始终被拒绝访问


- **原因**:
主要还是在 **网卡配置** 上出现错误项，但是具体还没有最正确的解决方案，只能靠对 unix 系统重新学习来解决


- **解决**:
当前的最好解决方案，就是选择 `网卡桥接` 模式，这样就可以让虚拟机和宿主机共享一个 IP 网段，
这样就可以双向互通了，不过IP的取址，九要收到宿主机网关的直接影响了。

# 鼠标被虚拟机窗口捕获
- **背景**:
在开启虚拟机窗口的时候，点击屏幕，鼠标会效识，据虚拟机反馈，就是被它捕获了，但是，我是使用 vagrantfile 直接创建的系统实例，全程都是在 dos 环境下操作，跟本用不到鼠标，所以，这个捕获功能对于我当前的需求是不必要的。

- **原因**:
虚拟机的鼠标捕获功能导致


- **解决**:
既然知道原因，我们直接取消掉这个捕获的动作就行了。

操作流程：*vm管理界面 => 右键vm实例 => Settings => System => Pointing Device => 选择 PS/2 Mouse 之外的选项*

# Failed to start LSB: Bring up/down
- **背景**:
在 `systemctl status network` 时，会出现此错误。

- **原因**:
具体情况应该会有很多种，而我的原因，就是因为多个网卡热开/关，导致遗留的网卡配置信息没有被注销，**mac地址没有被绑到对应的网卡上**。

- **解决**:
使用 `ifconfig` 检查当前被激活的网卡信息，然后到 */etc/sysconfig/network-scripts/* 下查看网卡配置。

比如：当前网卡只有一个名为 **eth0** 的在使用，而*network-scripts* 下有 **ifcfg-eth0** **ifcfg-eth1** 两份配置，那么就需要确保 **eth0** 网卡的配置正确，最重要的就是 **MACADDR** 这一项。

配置好之后，直接 `systemctl restart NetworkManager` 重启服务即可（如果时相关ipv6的，需要reboot）。
