...公共模块提取器
...就是从打包出来的所有模块中，选中一个或者几个整合成一个公共模块
...但是每次webpack都会重新翻译和打包

...| 样例：

    var webpack = require("webpack");
    var commonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

    module.exports = {
        entry: {
            p1: "./page1",
            p2: "./page2",
            p3: "./page3",
            ap1: "./admin/page1",
            ap2: "./admin/page2"
        },
        output: {
            filename: "[name].js"
        },
        plugins: [

            //这里有四种方法可以提取公共模块～
            //【first】:    默认会把所有入口节点的公共代码提取出来,生成一个common.js
            new CommonsChunkPlugin("commonJs.js");

            //【second】:   下面只提取两个模块
            new CommonsChunkPlugin("admin-commons.js", ["ap1", "ap2"]),

            //【third】：    令一种语法，需要返回一个对象
            new commonsChunkPlugin({
                name:'common', // 注意不要.js后缀
                chunks:['ap1','ap2']
            }),

            //【forth】:    chunks也可以使用函数形式
            new commonsChunkPlugin({
                name:"common",
                minChunks: function (module, count) {  //具体需要查看官方文档，minChunks指向哪里
                    return module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === - 1;
                }
            })
        ]
    };