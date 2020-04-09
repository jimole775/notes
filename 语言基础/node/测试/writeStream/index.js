const fs = require("fs");
const path = require("path");
let fileRead = fs.createReadStream(__dirname + "/asd.txt");
let fileWrite = fs.createWriteStream(__dirname + "/asd2.log");
let y = new Date().getFullYear();
let m = new Date().getMonth();
let d = new Date().getDay();
let fileName = `${y}.${m}.${d}.log`;

// let result  = new Promise(function(resolve,reject){
//     fs.readdir("log",function(err,length){
//     console.log("log目录的情况：",err,length);
//     if(length)resolve();
//      else reject();
  
//     })
// });


let hasFolder = fs.readdirSync(path.join(__dirname,"log"));

console.log("hasFolder? ",hasFolder);

// result.then(
//     function(){
//         console.log("result",arguments);
//         fs.mkdir("logss",function(){});
//     },function(){

//     }
// );




fs.appendFile(path.resolve(__dirname,"logs",fileName),"try","utf8",function(){
    console.log(arguments);
});

// checkFile(__dirname + "/asd3.txt")
// fileRead.pipe(fileWrite);
// fileWrite.on("close",function(){console.log("end")});


// function checkFile(path){
//     fs.open(path,'xw',function(err,fd){
//         if(err){
//             if(err.code.toUpperCase() === "EEXIST"){
//                 appendFile(path);
//             }
//         }


    
//     });
// }

// function appendFile(path){
//     let writeStream = fs.createWriteStream(path);
//     let readStream = fs.createWriteStream(path);
//     readStream.

// }

// function ctreateFile(path){
//     let writeStream = fs.createWriteStream(path);

// }




