/**
 * Created by Andy on 2017/9/18.
 */
const webpack = require('webpack');
module.exports = {
    entry: {test: __dirname + "/test.js"},
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]

    },
    output: {
        filename: "main.js",
        path: __dirname + "/"
    },
    plugins: [
        new webpack.DllReferencePlugin(
            {
                context: __dirname,
                manifest: require('./manifest.json')
            }
        )
    ],
    externals:{
        "__":"window._"
    }
};
