/**
 * Created by Andy on 2017/7/3.
 */
var fs = require("fs");
var thunkify = require("thunkify");
var read = thunkify(fs.readFile);
read("prototype.js")(function(err,str){console.log(str)});