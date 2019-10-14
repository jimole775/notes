     npm install file-saver --save

     npm install xlsx --save

     npm install script-loader --save-dev

     到 https://pan.baidu.com/s/1DiIGxik9HaanMQwx2ICGAg 下载插件（密码：fkkg）

     在src目录下创建一个vendor文件，把下载的插件复制进去

     四、修改build/webpack.base.conf.js
     　 'vendor': path.resolve(__dirname, '../src/vendor')