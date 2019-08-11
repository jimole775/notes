//Nodejs  模拟IP 爬取图片  
  
var _ = require('underscore');  
var cheerio = require('cheerio');  
var superagent = require('superagent');  
var async = require('async');  
var mkdirp = require('mkdirp');  
var fs = require('fs');  
var http = require('http');  
  
//本地存储目录  
var dir = './images';  
  
//创建目录  
mkdirp(dir, function(err) {  
  if(err){  
    console.log(err);  
  }  
});  
  
var imgList = new Array();  
  
  
var url = "http://www.easyicon.net/iconsearch/iconset:flatastic-icons";  
getData(url);  
  
console.log(imgList.length)  
  
  
function getData(url){  
  
  console.log("url" , url)  
  
  superagent.get(url).end(function (err, sres) {  
    if (err) {  
      console.log(err)  
      return;  
    }  
  
    var $ = cheerio.load(sres.text);  
    var pages_all = $(".pages_all");  
    var thisPage = pages_all.find("span");  
    var next = thisPage.next();  
  
    var liList = $("#container").find("ol").find("li");  
  
    var pages = new Array();  
    _.each(liList , function(item  , index){  
  
      if(index == 0 ){  
        return;  
      }  
      var href = $(item).find("a").eq(0).attr("href");  
      //获取数据，下载  
      //getHtml(href);  
  
      pages.push(href);  
    })  
  
    console.log(pages.length)  
  
    async.eachSeries(pages, function(item,callback){  
      console.log("-一轮结束111-")  
      getHtml(item , function(){  
        console.log("-一轮结束22-")  
        callback(null)  
      });  
  
    }, function(err , result) {  
  
      if(err){  
        console.log("-一轮结束-" + err)  
      }  
  
      console.log("-一轮结束-")  
      var href = next.attr("href");  
      if(href){  
        href = "http://www.easyicon.net" + href;  
        getData(href);  
      }  
  
    });  
  
  });  
  
}  
  
  
var getHtml = function(href , getHtmlCB){  
  
  var temp = "http://www.easyicon.net" + href;  
  
  console.log(temp)  
  
  superagent.get(temp).end(function (err, sres) {  
    if (err) {  
      console.log(err)  
      return;  
    }  
  
    var $ = cheerio.load(sres.text);  
  
    var name = $(".icon_img_one").find("img").attr("alt");  
    if(name){  
      name = name.replace(/ /g , "_")  
    }  
  
    var a96 = $("img[width=96]").parent().find("a").eq(0);  
    var href96 = a96.attr("href");  
  
    var a64 = $("img[width=64]").parent().find("a").eq(0);  
    var href64 = a64.attr("href");  
  
    var a32 = $("img[width=32]").parent().find("a").eq(0);  
    var href32 = a32.attr("href");  
  
    //saveImg(href96 , dir , name + "@3x.png" );  
   // saveImg(href64 , dir , name + "@2x.png" );  
   // saveImg(href32 , dir , name + ".png" );  
  
    console.log("---")  
  
    async.parallel(  
      [function(cb){  
        console.log("---11")  
        saveImagea(href96 , dir , name + "@3x.png" , function(){  
          cb(null);  
        })  
      },  
      function(cb){  
        saveImagea(href64 , dir , name + "@2x.png", function(){  
          cb(null);  
        } )  
      },  
      function(cb){  
        saveImagea(href32 , dir , name + ".png", function(){  
          cb(null);  
        } )  
      }  
    ] , function(err, results){  
  
        if(err){  
          console.log("下载出错")  
        }  
  
        getHtmlCB();  
    })  
  
  
  });  
  
}  
  
/** 
 * 模拟ip，下载图片 
 * @param url 
 * @param dir 
 * @param name 
 * @param cb 
 */  
var saveImagea = function (url, dir,name , cb){  
  
  var ip = _.random(1 , 254)  
    + "." + _.random(1 , 254)  
    + "." + _.random(1 , 254)  
    + "." + _.random(1 , 254)  
  
  console.log(url , ip)  
  superagent  
    .get(url)  
    //.set("X-Forwarded-For" , "10.111.198.90")  
    .set("X-Forwarded-For" , ip)  
    .end(function (err, sres) {  
      if (err) {  
        console.log(err)  
        return;  
      }sres  
      //console.log(sres.body);  
      fs.writeFile(dir + "/"+name, sres.body, 'binary', function (err) {  
        if (err) throw err;  
        console.log('file saved '+name);  
        cb();  
      });  
    })  
  
}  
  
  
  
function saveImg(url, dir,name , cb){  
  http.get(url, function(res){  
    res.setEncoding('binary');  
    var data='';  
    res.on('data', function(chunk){  
      data+=chunk;  
    });  
    res.on('end', function(){  
      fs.writeFile(dir + "/"+name, data, 'binary', function (err) {  
        if (err) throw err;  
        console.log('file saved '+name);  
  
        console.log("---")  
  
        cb();  
      });  
    });  
  }).on('error', function(e) {  
    console.log('error'+e)  
    cb();  
  });  
}  