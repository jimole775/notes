首先，打包设置时，默认的MANIFEST.MF文件会在src/main/com/java/meta-inf/下面
这样就导致打包的时候，使用的文件清单没有主类

- 解决：
    只要在打包的时侯，修改一下meta-inf的路径就行，一般只有在src下的meta-inf才会被识别