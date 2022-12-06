# 安装centos/7的工具包
yum -y install wget
yum -y install net-tools
yum -y install telnet
yum -y install kernel kernel-devel kernel-headers gcc make

# 开启虚拟光驱
mkdir /media/cdrom # 创建 cdrom 文件要存储的位置
lsscsi # 查看虚拟设备映射的位置
mount /dev/sr0 /media/cdrom # 把光盘文件挂载到 /media/cdrom

/media/cdrom/VBoxLinuxAdditions.run # 启动光驱

# 设置防火墙自启动
systemctl enable firewalld

reboot # 重启