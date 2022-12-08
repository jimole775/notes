# 1. yum -y install java 之后，没有 javac 指令

- **背景**：
一般情况下，都是直接上传 jdk 的包到 linux 环境，解包后配置环境，然后再执行需要的指令

但如果是在配置 **自动话构建** 和 **部署流程**，可能就无法（可能用docker可以打包）实现上述步骤了，只能使用 wget、yum、rpm 之类的工具，

自动下载和解包，自动配置环境变量，自动运行构建任务。

没有 javac 指令就是使用 `yum -y install java`自动安装 java 之后出现的问题。

- **原因**：
可能是没有明确安装的版本

- **解决**：

1. 使用 `yum search java-1.8.0` 看当前yum的库有没有 1.8.0 版本的 java 包

2. 根据反馈的列表，安装对应有 **development** 标签的就可以了，比如 `yum -y install java-1.8.0-openjdk-devel.x86_64`
