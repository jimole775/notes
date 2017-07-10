/**
 * Created by Andy on 2017/7/7.
 */
"use strict";
const fs = require("fs");
const storeAddr = __dirname + "/stores/";
const fileAddr = {
    "jpg":storeAddr + "images/",
    "gif":storeAddr + "images/",
    "txt":storeAddr + "texts/"
};

var bufPadding = 0;
var ws = null;

function writeImg(buf, name, type) {
    if(!ws)ws = fs.createWriteStream(fileAddr[type] + name);
    ws.write(buf, "base64");
}

function writeTxt(buf, name, type) {
    if(!ws)ws = fs.createWriteStream(fileAddr[type]  + name);
    ws.write(buf, "unicode");
}

function storingFile(buf, size, name) {

    bufPadding += buf.length;
    var type = name.split(".").pop();
    switch (type) {
        case "jpg":
        case "gif":
            writeImg(buf, name, type);
            break;
        case "txt":
            writeTxt(buf, name, type);
            break;
    }

    //Ð´ÍêºóÖØÖÃ
    if(bufPadding >= size){
        bufPadding = 0;
        ws.end(function(){
            ws = null;
        });
    }
}


function extractFile(fileName, callback) {
    var type = fileName.split(".").pop();
    var rs = fs.createReadStream(fileAddr[type] + fileName);
    var buf = [];
    var nread = 0;
    fs.exists(fileAddr[type] + fileName,function(exs){
        if(exs){
            rs.on("data",function(chunk){
                buf = buf.concat([...chunk]);
                nread += chunk.length;
            });
            rs.on("end",function(){
                callback(new Buffer(buf, 0, nread));
                buf.length = 0;
                nread = 0;
            });
        }
        else callback(null,"file has no found!")
    });
}

module.exports = {
    storingFile,
    extractFile
};