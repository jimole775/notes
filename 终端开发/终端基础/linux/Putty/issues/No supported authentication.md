在 `linux/unix` 环境下使用 `sshkey-gen` 生成的私钥被用在putty上
从Windows系统登录远程主机的过程中，会出现如下的错误信息：

> PuTTY error: "No supported authentication methods available"

这是因为 `Linux` 下生成的是 `raw key`，而 `putty` 使用的是自己特定的 `*.ppk` 格式，这里需要格式转换。

在格式转换之前，还需要注意一点，`puttygen` 要求 `raw key` 文件的结尾要有一个换行。

因此需要使用文本编辑器打开 `raw key` 文件然后添加一个换行。

如下所示：
```
EqMBYPQNIBF2pVoj80aBXY/p1g9+4jiIzYyHHGYIpZROpv3RT06PWMLlgg3+eCWbtaE=

-----END RSA PRIVATE KEY-----
```

确保在使用文本编辑器打开该文件后，光标能够落在最后一行的下一行（空行）。

接着，运行 `puttygen`，选择 `Conversions -> Import Key`，然后保存成 `*.ppk` 格式的 `key`。

打开 `putty`，然后在选择 `Connection->SSH->Auth` ，然后导入刚刚生成的 `*.ppk` 文件。然后就能够正常登陆了。