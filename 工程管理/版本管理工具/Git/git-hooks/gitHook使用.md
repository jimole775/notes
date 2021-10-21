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
1. 在服务器创建一个 `裸仓库`，作为git服务器

2. 在服务器的nginx目录再创建一个部署仓库，作为 `部署仓库`
   在 `部署仓库` 配置 `post-receive` 自动部署工作。