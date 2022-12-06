yum -y install wget

# 安装 java
wget https://repo.huaweicloud.com/java/jdk/8u202-b08/jdk-8u202-linux-x64.tar.gz
tar -zxvf jdk-8u202-linux-x64.tar.gz
mv jdk1.8.0_202 /opt/
ln -s /opt/jdk1.8.0_202/bin/java /usr/local/bin/java

# 配置java环境变量
/mnt/shared/java_env.sh /opt/jdk1.8.0_202

# 安装 zookeeper
wget https://archive.apache.org/dist/zookeeper/zookeeper-3.4.14/zookeeper-3.4.14.tar.gz
tar -zxvf zookeeper-3.4.14.tar.gz
mv zookeeper-3.4.14 /opt/

# 打开防火墙端口
firewall-cmd --zone-public --add-port=2181/tcp --permanent
firewall-cmd --zone-public --add-port=2888/tcp --permanent
firewall-cmd --zone-public --add-port=3888/tcp --permanent
firewall-cmd --reload # 重启防火墙，使其生效

# 把配置文件复制到 /home/zookeeper-3.4.14/conf/
cp /mnt/shared/zoo.cfg /opt/zookeeper-3.4.14/comf/zoo.cfg

# 先创建 zookeeper 文件夹，避免 echo 语句报错
mkdir /opt/zookeeper/data

# 给每台机子配置 id
echo 1 > /opt/zookeeper/data/myid

# 开启服务
/opt/zookeeper-3.4.14/bin/zkServer.sh start