/**
 * Created by Andy on 2016/11/23.
 */
var http = require("http"),
	fs = require("fs"),
	//cheerio = require("cheerio"),
	q = require("Q");   //promise生成库

var target = "http://cn.bing.com",
	imgUrl = "",
	imgType = ".jpg",   //默认的图片类型
	count = 0,
	isNewImg = true,
	loopInterval = 10*60*1000;  //轮询间隔

(function run(){
	count++;
	getHtml (target)
		.then (analyzeHtml, console.error)    //解数据
		.then (saveImg, console.error);   //存储图片
	setTimeout(run,loopInterval);
})();

function analyzeHtml(){
	var html = arguments[0].toString();
	//var $ = cheerio.load(html);   //img图片并不生成在dom模板内部，不需要加载模板
	gotImgUrl(html);
}

function gotImgUrl(html){
	var key = "g_img="; //图片url被生成在script文本内部，“g_img=”就是文本标识，根据此标识截取url地址，如果想要知道截取的情况，可以逐一打印以下的结果
	var imgUrlStringPoint = html.split(key)[1];
	var g_img = imgUrlStringPoint.substring(0,imgUrlStringPoint.indexOf("}"));
	var newImgUrl = target + g_img.substring(g_img.indexOf("\/"),g_img.indexOf("\","));

	//如果一个轮询之内，获取到的图片相同，就不进行处理
	if(newImgUrl !== imgUrl) {
		imgUrl = newImgUrl;
		isNewImg = true;
	}else{
		isNewImg = false;
	}

	imgType = imgUrl.substring(imgUrl.lastIndexOf("."),imgUrl.length);
}

function saveImg(){
	if(isNewImg){
		var writeImg = fs.createWriteStream(__dirname + "/backgroundImg" + count + imgType); //创建文件流
		http.get(imgUrl,function(res){
			res.on("data",function(chrunk){
				writeImg.write(chrunk,"base64");    //图片支持base64格式
			});
			res.on("end",function(){
				writeImg.end(function(){console.log("is worked!!!")});  //读写完毕
			})
		});
	}
}



function getHtml(url){
	var chrunks = [];
	var nread = 0;
	var _html = "";
	var deferred = q.defer();
	http.get(url,function(res,err){

		if(err) deferred.reject(err);

		res.on("data",function(chrunk){
			chrunks.push(chrunk);
			nread += chrunk.length;
		});

		res.on("end",function(){
			_html = Buffer.concat(chrunks,nread);
			deferred.resolve(_html);
			chrunks.length = 0;
			nread = 0;
		});

	});

	return deferred.promise;
}