node -v

@echo off
IF ERRORLEVEL 1 (START iexplore.exe http://nodejs.org/dist/v0.6.3/node-v0.6.3.msi
pause 安装node完成之后) ELSE IF ERRORLEVEL 0 ECHO 系统中已经有node,不需要安装

IF NOT EXIST %cd%\node_modules\cheerio (ECHO 正在安装依赖包,请等待...
npm install -g cheerio
npm install cheerio --save-dev)

IF NOT EXIST %cd%\node_modules\q (ECHO 正在安装依赖包,请等待...
npm install -g q
npm install q --save-dev)

ECHO 依赖包已就绪,正在运行程序...
node spider.js
