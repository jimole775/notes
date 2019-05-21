这主要是由于 ```react-native-cli``` 没安装到本地造成的

按照 [中文官网](https://reactnative.cn/docs/getting-started.html) 搭建环境的教程，是直接全局安装的

``` bash
npm install -g yarn react-native-cli
```

很奇怪的是，我在另一台电脑按照教程走，是完全可以的

有可能是系统环境不同造成的

- ``` Windows 10 企业版 ``` 安装成功
- ``` Windows 10 家庭版 ``` 安装失败

当然，也有可能是其他配置的问题

不管如何，以后就直接把 ```react-native-cli``` 安装到项目的 ```node_modules``` 就可以了

``` bash
npm install --save react-native-cli
```