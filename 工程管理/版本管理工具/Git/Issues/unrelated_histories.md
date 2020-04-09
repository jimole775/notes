fatal: refusing to merge unrelated histories

solution: 
出现这个问题的最主要原因还是在于本地仓库和远程仓库实际上是独立的两个仓库

假如我之前是直接clone的方式在本地建立起远程github仓库的克隆本地仓库就不会有这问题了

查阅了一下资料，发现可以在pull命令后紧接着使用 --allow-unrelated-history 选项来解决问题（该选项可以合并两个独立启动仓库的历史）

``` bash
git pull origin master --allow-unrelated-histories
git push origin master:master
```