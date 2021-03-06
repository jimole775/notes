
# prototype.js源码
``` js
var fireEvent = function(element,event){
 if (document.createEventObject){
  // IE浏览器支持fireEvent方法
  var evt = document.createEventObject();
  return element.fireEvent('on'+event,evt)
 }
 else{
  // 其他标准浏览器使用dispatchEvent方法
  var evt = document.createEvent( 'HTMLEvents' );
  // initEvent接受3个参数：
  // 事件类型，是否冒泡，是否阻止浏览器的默认行为
  evt.initEvent(event, true, true);  
  return !element.dispatchEvent(evt);
 }
}
```

# jquery.js源码
``` js
/**
 * 事件触发器
 * @param { Object } DOM元素
 * @param { String / Object } 事件类型 / event对象
 * @param { Array }  传递给事件处理函数的附加参数
 * @param { Boolean } 是否冒泡
 */
trigger : function( elem, event, data, isStopPropagation ){
 var type = event.type || event,
  // 冒泡的父元素，一直到document、window
  parent = elem.parentNode || 
   elem.ownerDocument || 
   elem === elem.ownerDocument && win,
  eventHandler = $.data( elem, type + 'Handler' );

 isStopPropagation = typeof data === 'boolean' ? 
  data : (isStopPropagation || false);

 data = data && isArray( data ) ? data : [];

 // 创建自定义的event对象  
 event = typeof event === 'object' ? 
  event : {
   type : type,
   preventDefault : noop,
   stopPropagation : function(){
    isStopPropagation = true;
   }
  };

 event.target = elem;  
 data.unshift( event );
 if( eventHandler ){
  eventHandler.call( elem, data );
 }
 // 递归调用自身来模拟冒泡
 if( parent && !isStopPropagation ){
  data.shift();
  this.trigger( parent, event, data );
 }
}
```