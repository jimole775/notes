var isIE = (navigator.appName == "Microsoft Internet Explorer");
//判断IE远远不止上面一种方法,可以使用IE更多特有的东西,如:window.ActiveXObject,document.all等,这些都属于对象/特征检测法了!通常要在不同的浏览器上写不同的样式(因为IE样式解析也各有不同),那就得判断版本了.可以这样做
//检测浏览器及其版本的代码


//文章来自 codego.net  请看源代码:
function getBrowser() {
    var browser = {
            msie: false, firefox: false, opera: false, safari: false,
            chrome: false, netscape: false, appname: 'unknown', version: 0
        },
        userAgent = window.navigator.userAgent.toLowerCase();
    if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent)) {
        browser[RegExp.$1] = true;
        browser.appname = RegExp.$1;
        browser.version = RegExp.$2;
    } else if (/version\D+(\d[\d.]*).*safari/.test(userAgent)) { // safari
        browser.safari = true;
        browser.appname = 'safari';
        browser.version = RegExp.$2;
    }
    return browser.appname + browser.version;
}


//对象/特征检测法
//user-agent字符串提供了关于Web浏览器的大量信息,--codego.net--，包括浏览器的名称和版本。
//该方法是一种判断浏览器能力（而非浏览器的确切型号）的通用方法。大部分JS专家认为这个方法最合适，因为他们认为按照该方法所编写的脚本是经得起未来考验的。
//获取IE浏览器的版本号
//返回数值，显示IE的主版本号
function getIEVer1() {
    var ua = navigator.userAgent; //获取用户端信息
    var b = ua.indexOf("MSIE "); //检测特殊字符串"MSIE "的位置
    if (b < 0) {
        return 0;
    }
    return parseFloat(ua.substring(b + 5, ua.indexOf(";", b))); //截取版本号字符串，并转换为数值
}

console.log(getIEVer1()); //返回数值8(我的IE8)
//如果更关注浏览器的能力而不在乎它实际的身份，就可以使用这种方法。
var ua = navigator.userAgent.toLowerCase(); //获取用户端信息
var info = {
    ie: /msie/.test(ua) && !/opera/.test(ua), //匹配IE浏览器
    op: /opera/.test(ua), //匹配Opera浏览器
    sa: /version.*safari/.test(ua), //匹配Safari浏览器
    ch: /chrome/.test(ua), //匹配Chrome浏览器
    ff: /gecko/.test(ua) && !/webkit/.test(ua) //匹配Firefox浏览器
};
(info.ie) && console.log("IE浏览器");
(info.op) && console.log("Opera浏览器");
(info.sa) && console.log("Safari浏览器");
(info.ff) && console.log("Firefox浏览器");
(info.ch) && console.log("Chrome浏览器");
//通常我们做得最多的,就是判断是否是IE了,其它几种浏览器一般都会符合标准.有些客户只需要符合IE和FF就已经满足了.那么我们可以这样做:


//user-agent字符串检测法

//获取IE浏览器的版本号
//返回数值，显示IE的主版本号
function getIEVer2() {
    var ua = navigator.userAgent; //获取用户端信息
    var b = ua.indexOf("MSIE "); //检测特殊字符串"MSIE "的位置
    if (b < 0) {
        return 0;
    }
    return parseFloat(ua.substring(b + 5, ua.indexOf(";", b))); //截取版本号字符串，并转换为数值
}
console.log(getIEVer2()); //返回数值7 检测操作系统:
var isWin = (navigator.userAgent.indexOf("Win") != -1); //如果是Windows系统，则返回true
var isMac = (navigator.userAgent.indexOf("Mac") != -1); //如果是Macintosh系统，则返回true
var isUnix = (navigator.userAgent.indexOf("X11") != -1); //如果是Unix系统，则返回true
var isLinux = (navigator.userAgent.indexOf("Linux") != -1); //如果是Linux系统，则返回true 文章大部分内容来自于《Javascript征途》