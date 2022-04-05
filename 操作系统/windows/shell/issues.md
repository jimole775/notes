# rm指令
在windows端，删除文件夹的权限比较奇怪
`rm -rf` 在创建的文件夹异常的时候是无法删除的
有时候需要管理员权限 `runas /user:administrator`
但主要还是，不要使用 绝对路径 去删除资源，应该进到对应的目录后，再删除

``` bash
rm -rf /f/test # 有可能出现需要管理员权限的情况
```

- 可以改成这样：
``` bash
cd f:
rm -rf test
```