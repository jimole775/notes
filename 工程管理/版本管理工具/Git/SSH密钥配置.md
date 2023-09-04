## 一 、设置Git的user name和email：
``` bash
$ git config --global user.name xuhaiyan

$ git config --global user.email haiyan.xu.vip@gmail.com
```

## 二、生成SSH密钥过程：

#### 1. 查看是否已经有了ssh密钥：`cd ~/.ssh`

如果没有密钥则不会有此文件夹，有则备份删除

#### 2. 生成密钥：

  ``` bash
  $ ssh-keygen -t rsa
  ```
  按3个回车，密码为空。

  ``` bash
  Your identification has been saved in /home/tekkub/.ssh/id_rsa.

  Your public key has been saved in /home/tekkub/.ssh/id_rsa.pub.

  The key fingerprint is:____
  ```

最后得到了两个文件：**id_rsa** 和 **id_rsa.pub**

#### 3. 添加密钥到ssh：`ssh-add 文件名`
需要之前输入的密码。

#### 4. 在github上添加ssh密钥，这要添加的是 `id_rsa.pub` 里面的公钥。
打开 `https://github.com/` ，登陆xuhaiyan825，然后添加ssh。

#### 5. 测试：`ssh -T git@github.com`
