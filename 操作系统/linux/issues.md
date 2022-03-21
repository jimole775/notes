1. 如果ls指令下，有文件夹或者文件，但是需要打开或者进入时提示 No such file or directory,可以尝试以下两种方法
   1) 使用perl指令
   2) 加上"./"前缀

2. 用putty ssh登陆linux时，出现 no supported authentication methods available
   打开linux的sshd_config,尝试以下3处的修改：
   1) StrictModes no
   2) PasswordAuthentication yes
   3) PremitRootLogin yes
   修改完毕之后，`service sshd restart` 重启服务

3. 全局安装完gulp之后，使用指令gulp之后出现 "command not found"
   1) 首先，需要使用 `ln -s` 来创建软链接到 `usr/local/bin` (一般如果使用npm安装的gulp，gulp都会在node目录的bin下) 
   2) 如果上面还不能解决，应该就是一开始安装gulp的时候，不是用的全局形式，gulp链接错了，我的解决之道就是直接重置服务器，然后再次安装的时候，直接 `npm install -g gulp`

4. 线程执行的时候被系统"killed"
   1) 很大程度上，是因为系统内存不足导致，killed命令由kernal内核发起，所以，无解

5. 【node错误】/usr/bin/env: node: No such file or directory
   1) 在执行 npm 指令的时候报错, 这是由于在创建软连接时, 还没有创建 node, 因为 npm 的执行需要依赖node, 正确的创建顺序应该是先创建node, 再创建npm

6. 解决service iptables save出错please try to use systemctl
https://blog.csdn.net/xu_melon/article/details/79043320   

7. Failed to start nginx.service: Unit not found