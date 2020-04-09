encodeURIComponent;
map;
forEach;





关于重复点击-显示-隐藏方法：

var show=!show;

惰性载入：

原函数--function createXHR(){
		if (typeof XMLHttpRequest != "undefined"){
			return new XMLHttpRequest();
			
			

}	else if( typeof ActiveXObject != "undefined"){
			if( typeof arguments.callee.activeXString != "string"){
				var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
					i,len;
				for (i=0,len = versions.length; i < len; i ++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
catch(ex){
//Todo:
}						
}
}
return new ActiveXObject(arguments.callee.activeXString);
	}else{
throw new Error("No XHR object available.");

		

}


}

惰性包装--

function createXHR(){
if (typeof XMLHttpRequest != "undefined"){
		createXHR = function(){
		return new XMLHttpRequest();

};
}else if( typeof ActiveXObject != "undefined"){
		createXHR = function(){
		if(typeof arguments.callee.activeXString!= "string"){
var version = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
i,len;
				for (i=0,len = versions.length; i < len; i ++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
catch(ex){
//Todo:
}						
}
}
return new ActiveXObject(arguments.callee.activeXString);
}else{
		createXHR = function(){
   throw new Error ("No XHR object available.");
};
}
return creatXHR();
}

}

}


惰性包装2--

var createXHR = (function(){
if (typeof XMLHttpRequest != "undefined"){

return	function(){
		return new XMLHttpRequest();

};
}else if( typeof ActiveXObject != "undefined"){

	return	function(){
		if(typeof arguments.callee.activeXString!= "string"){
var version = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
i,len;
				for (i=0,len = versions.length; i < len; i ++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
catch(ex){
//Todo:
}						
}
}
return new ActiveXObject(arguments.callee.activeXString);
}else{
	return function(){
   throw new Error ("No XHR object available.");
};
}

})();








    .directive('adjustBottomBy', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
        return {
            restrict: 'A',
            scope: false,
            link: link
        };

        function link(scope, element, attrs) {
            var el = element[0];
            var major = el.querySelector('[data-perspect="major"]');
            var minor = el.querySelector('[data-perspect="minor"]');

            scope.$watch(attrs.adjustBottomBy, function () {

                setTimeout(function () {
                    var height = major.clientHeight;

                    angular.element(minor).css('bottom', height + 'px');

                    $ionicScrollDelegate.scrollBottom();
                }, 10);

            });

            console.log('major: ', major);
            console.log('minor: ', minor);
        }
    }]);

