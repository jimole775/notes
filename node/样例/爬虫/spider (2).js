/**
 * Created by Andy on 2016/12/19.
 */
var http = require("http");
var fs = require("fs");
var cheerio = require("cheerio");
var promise = require("q");

var homePageURL = "http://www.ivrfans.cn";
var titleList = [];
var zipList = [];
var imgURLList = [];

//流程MAP
analyzeHtml(homePageURL)
    .then(getTitleList,console.error)
    .then(getZipList,console.error);

function getTitleList(page){
    var $ = cheerio.load(page);
    var hrefs = $(".titleList").find("a");
    var len = hrefs.length;
    while(len--){
        titleList.push(hrefs[len].attribs.href);
    }
}

function getZipList(data){
    var len = titleList.length;
        while(len--){
            analyzeHtml(homePageURL + titleList[len])
                .then(getPageTurnList,console.error)
                .then(getZip,console.error); //获取当前页的zip，导航列表没有当前页面的url，所以需要手动再调一次
        }
}



function getPageTurnList(page){
    var $ = cheerio.load(page);
    var hrefs = $(".page").find("a.paginate");
    var len = hrefs.length;
        while(len--){
            analyzeHtml(homePageURL + hrefs[len].attribs.href)
                .then(getZip);
        }

}


function getZip(page){
    var $ = cheerio.load(page);
    var hrefs = $(".animalPhoto").find("a");
    var len = hrefs.length;

    while(len--){
        http.get(homePageURL + hrefs[len].attribs.href,function(res){
            var chrunks = [];
            var nread = 0;
            res.on("data",function(chrunk){
                chrunks.push(chrunk);
                nread += chrunk.length;
            });
            res.on("end",function(){
                var _page = Buffer.concat(chrunks,nread);
                var _$ = cheerio.load(_page.toString());
                //console.log($("#pageCenter").find("li").find("a").attribs.href);
                var _hrefs = _$("#pageCenter").find("li").find("a");
                var len = _hrefs.length;
                while(len--){
                    http.get(homePageURL + _hrefs[len].attribs.href,function(res){
                        var _chrunks = [];
                        var _nread = 0;
                        res.on("data",function(chrunk){
                            _chrunks.push(chrunk);
                            _nread += chrunk.length;
                        });
                        res.on("end",function(){
                            var __page = Buffer.concat(chrunks,nread);
                            var __$ = cheerio.load(__page.toString());
                            console.log(__$(".petImg")[0].attribs.src);
                        })

                    })
                }
            });

        });
    }

}


function analyzeHtml(url){
    var chrunks = [];
    var nRead = 0;
    var page = "";
    var deferred = promise.defer();
    http.get(url,function(res,err){

        if (err) {
            deferred.reject(err)
        } else {

            res.on("data", function (chrunk) {

                chrunks.push(chrunk);
                nRead += chrunk.length;
            });
            res.on("end", function () {
                page = Buffer.concat(chrunks, nRead);
                chrunks.length = 0;
                nRead = 0;
                deferred.resolve(page.toString());
            });

        }
    });

    return deferred.promise
}

