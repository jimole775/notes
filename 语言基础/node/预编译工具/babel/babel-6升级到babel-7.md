使用官方命令直接升级

## 不安装到本地而是直接运行命令，npm 的新功能
npx babel-upgrade --write

## 或者常规方式
npm i babel-upgrade -g
babel-upgrade --write

## babel-7的特点
1. 所有包都是以 `@babel/` 开头
2. 所有包的版本都是 `^7.x` 以上