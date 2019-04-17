- 不能使用 *style-loader*，使用就报这个错误
    因为这个插件主要的功能，就是把所有的外链css都整合到一个css文件，包括通过import和require方式导入到js的css文件
    如果使用style-loader的话，就会把通过import和require方式载入的css文件解析到html模块的style标签内，形成内联样式