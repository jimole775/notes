解决：git SSL certificate problem: unable to get local issuer certificate
标签：verify   unable   lob   服务器   charm   https   

pycharm用git获取项目的时候提示git SSL certificate problem: unable to get local issuer certificate

这个问题是由于没有配置信任的服务器HTTPS验证。默认，cURL被设为不信任任何CAs，就是说，它不信任任何服务器验证。

只需要执行下面命令就可以解决：
git config --global http.sslVerify false
