
- 方法1 -- 设置CSS属性
``` css
.event-disable{
    pointer-events: none;
}
```

- 方法2 -- 删除元素监听事件，然后再绑定回来

``` js
		(function (element1) {
			addHandler (element, "click", function () {
				if (!isJinduExtend) {
					RMTClickEvent.extendJinduBar ();
				}
				else {
					RMTClickEvent.extendButton ();
				}
				var selfFn = arguments.callee;			//暂存event事件；

				removeHandler(element, "click", selfFn);    	//防止用户多次点击，先清除点击事件

				setTimeout(function(){
					addHandler(element, "click", selfFn);   //500MS之后再次绑定点击事件
				},500);
			});

		}) (button1);


		//兼容 PC端鼠标事件 和 手机端触屏事件；
		function addHandler (element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener (type, handler, false);
			}
			else if (element.attachEvent) {
				element.attachEvent ("on" + type, handler);
			}
			else {
				element["on" + type] = handler;
			}
		}

		//兼容 PC端鼠标事件 和 手机端触屏事件；
		function removeHandler (element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener (type, handler, false);
			}
			else if (element.detachEvent) {
				element.detachEvent ("on" + type, handler);
			}
		}
```