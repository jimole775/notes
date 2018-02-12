/**
 * Created by Andy on 2017/10/15.
 */
const webpack = require('webpack');

const vendors = [
    'iscroll',
    'json2',
    'lazyload'
    // ...其它库
];

module.exports = {
    output: {
        path: __dirname + "/lib",
        filename: '[name].js',
        library: '[name]'   //dll库的名称，在输出的文件"vendor.js"里面可以查看
    },
    entry: {
        vendor: vendors
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]', //在这里相当与要引用dll库，所以名称必须和定义的库名一致
            context:  __dirname
        })
    ]
};



