# ==============================
# 本脚本主要用于 centos/7 镜像系统
# 共享文件夹的配置
# ==============================

yum -y install kernel kernel-devel kernel-headers gcc make

# 开启虚拟光驱
mkdir /media/cdrom # 创建cdrom文件要存储的位置
lsscsi # 查看虚拟设备映射的位置
mount /dev/sr0 /media/cdrom # 把光盘文件挂载到 /media/cdrom

/media/cdrom/VBoxLinuxAdditions.run # 启动光驱

reboot # reboot之后等待文件夹挂载
