const zlib = require("zlib");
let hp = require("http");
let fs = require("fs");
let path = require("path");
hp.createServer(function(req,res){
 
    let contenType = "text/html";
    let fileName = req.url.split("/").pop();
    fileName = fileName?fileName:"index.html";
    let extension = fileName.split(".").pop();
    if(extension === "ico"){
        contenType = "application/x-ico";
    }
    if(extension === "png"){
        contenType = "application/x-png";
    }
    if(extension === "json"){
        contenType = "application/json";
    }
    if(extension === "js"){
        contenType = "application/x-javascript";
    }

    res.writeHead(200, {
        "content-type":contenType
        ,"content-encoding": "gzip"
       });

    let ws = fs.createReadStream(path.join(__dirname,fileName));
    ws.pipe(zlib.createGzip()).pipe(res);
    
    // res.write("is ok");
    // res.end();                   
}).listen(8080);    