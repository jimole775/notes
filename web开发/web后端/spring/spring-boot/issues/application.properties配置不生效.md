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