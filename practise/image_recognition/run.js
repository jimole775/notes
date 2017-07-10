/**
 * Created by Andy on 2017/7/4.
 */
global.ROOT_DIR = __dirname;
global.HOST_DIR = __dirname;
var createHttp = require("./http_basic/index.js");
createHttp.run();

var filesIO = require("./files_store");
filesIO.extractFile("CDN.txt", function (buf,err) {
    console.log(buf.toString("utf8"))
});