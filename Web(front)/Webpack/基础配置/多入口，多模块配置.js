/**
 * Created by Andy on 2017/8/15.
 */

module.exports = {
    entry: ["./index.js","./plugin.js"],    //多入口
    output: {
        path:"./",
        filename:"bundle.js"    //单一出口
    }
};

module.exports = {
    entry: {
        indexPro:"./index.js",  //多入口，同时多出口
        pluginPro:["./plugin.js","./plugin2.js"]
    },
    output: {
        path:"./",
        filename:"[name].[hash].[chunkhash].js"    //indexPro.js & pluginPro.js
    }
};
