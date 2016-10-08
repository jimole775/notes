$(function(){
    function offset(ele){//计算任意DOM元素距离文档的左或上的绝对偏移
        var l=ele.offsetLeft;
        var t=ele.offsetTop;
        var p=ele.offsetParent;
        while(p){
            if(window.navigator.userAgent.indexOf("MSIE 8")>-1){
                l+=p.offsetLeft;//加上上一级的边框
                t+=p.offsetTop;
            }else{
                l+=p.offsetLeft+p.clientLeft;//加上上一级的边框
                t+=p.offsetTop+p.clientTop;
            }
            p=p.offsetParent;
        }
        return {left:l,top:t}

    }
    var p= 0,t=0;
    $(window).scroll(function(){
        p=$(this).scrollTop();
        if(t<p){//向下
            $(".rongNav").removeClass("showNav");
        }else{//向上
            if(p<=930){
                $(".rongNav").removeClass("showNav");
            }else{
                $(".rongNav").addClass("showNav");
            }
        }
        setTimeout(function(){
            t=p;
        },0);
    });

});