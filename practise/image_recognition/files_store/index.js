/**
 * Created by Andy on 2017/7/7.
 */

const fs = require("fs");
const storeAddr = "./store/";
const imgAddr = storeAddr + "images/";
const txtAddr = storeAddr + "texts/";


//var ws = fs.createWriteStream(imgAddr + name + "." + type);
function writeImg(buf, size, name, type) {
    ws.write(buf, "base64");
}
var name = null;
function writeTxt(buf, size, name, type) {
    ws.write(buf, "unicode");
}

function* storingFile(buf){
    var _buf = buf ;
   /* return function (size){
        var _size = size;
        return function (name){
            var _name = name;
            return function (type){
                var _type = type;

            }
        }
    }*/
}

let tempSize = 0;
let tempBuf = [];
let tempName = '';
let tempType = '';
function storingFile(buf, size, name, type) {

    switch (type) {
        case "jpg":
        case "gif":
            writeImg(buf, size, name, type);
            break;
        case "txt":
            writeTxt(buf, size, name, type);
            break;
    }
}

storingFile("buff")("size")("name")("type");

function extractFile(fileName) {

}

let fileStore = {
    storingFile,
    extractFile
};
module.exports = fileStore;