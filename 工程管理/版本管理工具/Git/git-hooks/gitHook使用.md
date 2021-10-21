https://www.git-scm.com/docs/githooks

## 脚本文件
脚本文件都存在 `.git/hooks/` 下面，xxx.sample 只是样例文件，不执行，执行时需要去掉后缀。


## 语法：
hooks脚本不仅支持 shell，目前知道的还支持 python 和 node
- 配置 python:
``` sh
#!/bin/python
```
- 配置 node:
``` sh
#!/bin/node
```

## 配置自动化部署：
https://blog.csdn.net/Shen_Junxiao/article/details/85245390
1. 在服务器创建一个 `裸仓库`，作为git服务器, 在 `远程仓库` 配置的hooks中 `post-receive` 自动部署工作

2. 然后到服务器的nginx目录，使用 `git clone` 创建一个 `部署仓库`, 只要 `远程仓库` 收到更新，触发脚本，这个仓库就自动执行拉取和打包工作。

3. 在开发环境再 clone 一个 `开发仓库`，用于对接 `远程仓库`，主要工作就是配置 SSH 密钥。