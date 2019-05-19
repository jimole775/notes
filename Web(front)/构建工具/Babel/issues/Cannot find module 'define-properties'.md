# 问题原因
有可能是npm安装依赖包的时候出现问题

我遇到的情况是，在已经有packjson的项目里面又安装了一个拥有独立packjson的项目，导致出现的这个问题

# 解决
删除 node_modules 目录

重新 npm install 

搞定