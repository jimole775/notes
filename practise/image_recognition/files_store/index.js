/**
 * Created by Andy on 2017/7/7.
 */

const fs = require("fs");
const storeAddr = "./store/";
const imgAddr = storeAddr + "images/";
const txtAddr = storeAddr + "texts/";

let fileStore = {
    storingFile,
    extractFile
};
var ws = fs.createWriteStream(imgAddr + name + "." + type);
function writeImg(buf, size, name, type) {
    ws.write(buf, "base64");
}

function writeTxt(buf, size, name, type) {
    ws.write(buf, "unicode");
}

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

function extractFile(fileName) {

}


module.exports = fileStore;