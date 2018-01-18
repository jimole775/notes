/**
 * Created by Andy on 2016/12/2.
 */
var fs = require("fs");
var Q = require("Q");
var files = [];
var ws = fs.createWriteStream(__dirname + "/" + "bundle.js","utf-8");


readFile("/packConfig.json")
	.then(gotFiles,console.error)
	.then(analyzeFileToString,console.error);

function gotFiles(){
	files = JSON.parse(arguments["0"]).inject;
}

function analyzeFileToString(){
	files.forEach(function(item){
		readFile(item).then(handleFileData,console.error);
	});
}


function handleFileData(data){
	//过滤注释，单行和多行，
	//需要注意的是，必须先替换"http://"之后，再过滤掉//注释行，否则会出现错误，过滤完//注释行之后再把“http://”替换回来
	var lzCode = data.replace(/(http:\/\/)/g,"_|_").replace(/([\s\t]*\/\/.*(\r|\n)+)|(\/\*+(.|\s)*?\*\/)/g," ").replace(/_|_/,"http://");

	//过滤空格
	var querySpace = lzCode.replace(/(?![\w\d\s]\b)[\r\n\s\t]+/g,"");
	ws.write(querySpace);
	//console.log(querySpace);
}


function readFile(filename){
	var derferred = Q.defer();
	fs.readFile(
		__dirname + "/" + filename, "utf8",
		function(err, data){
			if(err) {
				derferred.reject(err)
			}
			else {
				derferred.resolve(data)
			}
		}
	);
	return derferred.promise;
}