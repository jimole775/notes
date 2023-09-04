# 以 windows 环境打包 puppeteer 为案例，导致的问题进行记录，一般打包都很正常

## 1. Error! Error: spawnSync patch ENOENT
这个问题就是 nodejs 在调用 patch 指令的时候，发现没有这个指令导致的 patch 指令是 win32 开源模块 gnuwin32 中的一个指令集，具体做什么不太清除

关于 patch 部分的缺失，我们可以到 [sourceforge](https://sourceforge.net/projects/gnuwin32/files/patch/) 进行下载

## 2. Could not find NASM, install it or build with openssl-no-asm
这种就很简单，直接下载 [NASM](https://www.nasm.us/) 即可
