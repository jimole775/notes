## 1. TIMESTAMP with implicit DEFAULT value is deprecated.
执行 `mysqld --initialize` 后出现上述告警，可以在 `my.ini` 配置中 `explicit_defaults_for_timestamp=true`

## 2. --secure-file-priv is set to NULL.
执行 `mysqld --initialize` 后出现上述告警，可以在 `my.ini` 配置中 
`secure-file-priv="D:/"`


## 3. MySQL 服务无法启动. 服务没有报告任何错误.
有几个点需要注意：
- 1. 如果在 `8.0` 版本以上，在 `my.ini` 中配置了 `datadir` 项，就导致这个问题发生，相反的，如果 `8.0` 以下，没有配置也会发生
- 2. 可以打开 `services.msc` 查看是否有 MySQL 服务，如果没有，可以使用 `mysqld install` 进行安装
- 3. 在 `services.msc` 中，查看是否 `MySQL80` 正在运行，这个网络服务，会和本地服务冲突，可以先关闭它，再运行 MySQL 版本


## 4. 在 `git bash` 中，使用 `mysql -u root -p` 无法进入 mysql 命令行模式
在windows中，应该使用 `cmd.exe` 去执行


## 5. navicat authentication plugin 'caching_sha2_password' cannot be loaded!
密码缓存的问题，需要重新刷新，并重置密码；
``` mysql

# 修改账户密码加密规则并更新用户密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

# 刷新权限并重置密码
FLUSH PRIVILEGES;

alter user 'root'@'localhost' identified by '123456';
```
