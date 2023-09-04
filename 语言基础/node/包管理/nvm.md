由于 es、node 的版本和特性不断更新，并且有些版本并不会向后兼容，在下载安装依赖包的时候，有时候总是出现语法报错的情况。

为了解决不断的换装 node 版本的问题，可以安装 nvm 工具，用于热切换 nodejs 的版本

- 安装：
可以到 [github](https://github.com/nvm-sh/nvm) 去下载

如果时 windows 系统，可以到 [这里](https://github.com/coreybutler/nvm-windows/releases)

- 使用：
``` bash
nvm install 16 # 下载 node.v16 的包
nvm use 16 # 切换到 node.v16 版本
```
