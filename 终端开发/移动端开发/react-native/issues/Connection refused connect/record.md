# Connect to 127.0.0.1:1080 [/127.0.0.1] failed: Connection refused: connect

主要是由于 Android Studio 默认设置的代理造成的

解决：

只要把全局环境的 .gradle 下的 gradle.properties里面的代理给注掉就可以了
``` bash
#systemProp.https.proxyPort=1080
#systemProp.http.proxyHost=127.0.0.1
#systemProp.https.proxyHost=127.0.0.1
#systemProp.http.proxyPort=1080
```