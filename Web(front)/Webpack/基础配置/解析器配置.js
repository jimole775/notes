/**
 * Created by Andy on 2017/8/16.
 */
module.exports = {
    entry: "",
    output: "",
    module: {
        loaders: [   //如果单个加载可以使用 loader:"",

            //test属于正则语法，后面的loader语法有点眼熟。。。
            {test: "/\.css$/", loader: "style!css!autoprefixer"},

            //exclude又代表什么？
            {test: "/\.js$/", loader: "babel", exclude: "/node_modules/"},

            //问号是咋回事？
            {test: "/\.scss$/", loader: "style!css!sass?sourceMap"},

            //图片加载，如果小于8k则自动转化成base64编码，
            //【那么说来，问号的意义在于条件判断，如果符合问号后面的内容，才执行前面的语句】
            {test: "/\.(png|jpg|gif)/", loader: "url-loader?limit=8192"},

            //html模板编译？
            { test: /\.(html|tpl)$/, loader: 'html-loader' },

            // 解析.vue文件
            { test: /\.vue$/, loader: 'vue' }
        ]
    },

    //根据blog的内容，vue在module里面配置了一个加载器了，这里需要再单独配置一次！～
    vue:{
        loaders:{
            css:"style!css!autoprefixer",
            html:"html-loader"
        }
    }

};