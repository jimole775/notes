nodejs没必要(具体来说应该不能)进行合并打包

es6语法的话使用高级版本的node就行

如果是模块类型的转换的话，使用 `babel-register` 就行

如果强行打包，gulp和webpack都不能满足需求

gulp就不说了--`不支持使用别名` ，打包时 `路径配置混乱` ，`不能按依赖打包模块` ，插件太多且 `文档稀少`

webpack只能使用自己搭建，很麻烦，如果使用vue-cli或者react-cli，还是需要手动配置一版后端的配置，因为涉及到 `读写文件` 的问题，路径也不好处理，需要区分 `打包文件` 的路径和 `静态资源` 和 `第三方模块` 的路径
