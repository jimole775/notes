使用winscp主要是针对内网服务器的自动化发布问题
主要方案就是，在当前部署的计算机上把前端代码都处理，打包好，然后再一次性通过winscp命令行的形式传输到内网服务器

# 常用指令
- `call`     执行任意远程Shell命令
- `cd`       改变远程工作目录
- `chmod`    改变远程文件权限
- `close`    关闭会话
- `exit`     关闭所有会话并结束程序
- `get`      从远程目录下载文件到本地目录
- `help`     显示帮助
- `keepuptodate` 在一个远程目录连续反映本地目录的改变
- `lcd`      改变本地工作目录
- `lls`      列出本地目录的内容
- `ln`       新建远程符号链接
- `lpwd`     显示本地工作目录
- `ls`       列出远程目录的内容
- `mkdir`    新建远程目录
- `mv`       移动或者重命名远程文件
- `open`     连接到服务器
- `option`   设置或显示脚本选项的值
- `put`      从本地目录上传文件到远程目录
- `pwd`      显示远程工作目录
- `rm`       删除远程文件
- `rmdir`    删除远程目录
- `session`  列出连接的会话或者选择活动会话
- `synchronize` 用一个本地目录同步远程目录

# 小样
> script.txt
``` bash
option echo off #关闭控制台输出
option transfer binary #规定为二进制传输
open <name>:<password>@<IP>:<PORT> #建立连接
cd /tmp #进入远程的 tmp 目录
put E:\testwinscp.txt #上传文件，只限文件，如果是文件夹的话，需要使用 synchronize 指令
synchronize remote -resumesuport=on E:\test /tmp/test #同步本地test目录到远程test目录，resumesuport是端点续传，目录比较大的时候，必须设置为on
exit #退出
```
> winscp.bat
``` bash
winscp /script=script.txt #运行脚本
```
