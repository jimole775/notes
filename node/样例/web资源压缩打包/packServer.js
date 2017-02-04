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
	var lzCode = data.replace(/((?!(:|'|"))[\s\t]*\/\/.*(\r|\n)+)|(\/\*+(.|\s)*?\*\/)/g," ");
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