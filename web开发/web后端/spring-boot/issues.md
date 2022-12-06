# 1. springboot无法生成demo项目：Spring Initializr Error : Failed to fetch metadata
- 原因：报这个错就是创建项目的服务器未配置，或者链接超时

国外：https://start.spring.io

国内：https://start.aliyun.com

- 解决：在IDE中正确配置就行
- 1. VScode 中搜 `Sprinng initializr: Service Url` 直接配置对应的地址就行

- 2. IDEA 中同上


# application.properties配置不生效

如果在target目录下面没有找到 `application.properties`，是由于pom.xml没有正确配置resources导致的。

- 解决：
``` xml
  <resources>
      <resource>
          <directory>src/main/java</directory>
          <includes><include>**/*.*</include></includes>
      </resource>
      <resource>
          <directory>src/main/resources</directory>
          <includes><include>**/*.*</include></includes>
      </resource>
  </resources>
```

# Do not use @ for indentation异常（多环境配置）
https://blog.csdn.net/u013170178/article/details/124397623