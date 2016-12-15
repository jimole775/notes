/**
 * Created by Andy on 2016/11/29.
 */
(function () {
	var win = window;
	var curContentBoxSlideStat = {left: 0, top: 0};
	var scroll_start_X = 0;
	var scroll_start_Y = 0;
	var scroll_move_X = 0;
	var scroll_move_Y = 0;
	var scroll_end_X = 0;
	var scroll_end_Y = 0;
	var diff_X = 0;
	var diff_Y = 0;
	var endTime = 0;
	var startTime = 0;
	var curShoeLeft = 0;

	var freezeCoord_X = false;          //冻结X坐标在move事件的获取；
	var freezeCoord_Y = false;          //冻结Y坐标在move事件的获取；
	var isVerticalScroll = true;        //页面默认滚动操作为上下滚动，如果左右滑动的动作 大于 页面的1/8宽度+上下滚动的动作，就停止上下滚动的操作，切换到左右滑动
	var isSliding = false;

	var horizontalScrollingTimer = null;        //左右滑动完毕之后，必须等待300毫秒，才能归零isVerticalScroll值，也就是说：左右滑动需要切换到上下滚动操作需要等待300毫秒
	var verticalScrollingWatcher = null;
	var interDeceleration = null;

	var scrollBodyController = $ ("#scroll-body-controller");
	var slidingShoe = $ ("#slidingShoe");
	var context_main = $ ("#context_main");
	var contentBoxes = scrollBodyController.find("ul");
	var curContentBox = $(contentBoxes[0]);

	var pageHeight = context_main.height ();
	var pageWidth = context_main.width ();

	var topHeight = 2 * 40 * (pageWidth / 640);   //根据计算rem的公式，获取头部nav的高度
	var limitTop = -curContentBox.height() + (pageHeight + topHeight);  //向上滚动的极限距离 = 内容盒子的高度 - 展示窗口的高度


	var handleReset = function () {

		//水平滑动
		if (!isVerticalScroll) {

			//向左滑动
			if (diff_X <= 0) {

				if (curContentBoxSlideStat.left >= 0)	//如果当前页面的left值大于或者等于零，就代表在第一页，

					if (Math.abs (curContentBoxSlideStat.left + diff_X) >= pageWidth / 4) { //拉动距离大于页面宽度的1/3，执行翻页效果，翻到第二页
						scrollBodyController.animate ({"left": -pageWidth}, 300, function () {isSliding = false;});
						slidingShoe.animate ({"left": pageWidth / 2}, 300, function () {isSliding = false;});
						//远程同步；
						win.SendRMTEventToApp ("RMTClickEvent.horizontalSliding", [1]); //转发当前页面的下标
					}
					else {	//否则停留在第一页
						scrollBodyController.animate ({"left": 0}, 300, function () {isSliding = false;});
						slidingShoe.animate ({"left": 0}, 300, function () {isSliding = false;});
					}
				else { //否则，就代表在第二页，无论如何拉动，都停留在第二页
					scrollBodyController.animate ({"left": -pageWidth}, 300, function () {isSliding = false;});
					slidingShoe.animate ({"left": pageWidth / 2}, 300, function () {isSliding = false;});
				}
			}
			//向右滑动
			else if (diff_X >= 0) {
				if (curContentBoxSlideStat.left < 0)	//如果当前页面的left值小于零，就代表在第二页

					if (Math.abs (curContentBoxSlideStat.left - diff_X) - pageWidth >= pageWidth / 4) {//拉动距离大于页面宽度的1/3，执行翻页效果,翻到第一页
						scrollBodyController.animate ({"left": 0}, 300, function () {isSliding = false;});
						slidingShoe.animate ({"left": 0}, 300, function () {isSliding = false;});
						//远程同步；
						win.SendRMTEventToApp ("RMTClickEvent.horizontalSliding", [0]); //转发当前页面的下标
					}
					else {
						scrollBodyController.animate ({"left": -pageWidth}, 300, function () {isSliding = false;});
						slidingShoe.animate ({"left": pageWidth / 2}, 300, function () {isSliding = false;});
					}
				else {//否则，就代表在第一页，无论向右如何拉动，都停留在第一页
					scrollBodyController.animate ({"left": 0}, 300, function () {isSliding = false;});
					slidingShoe.animate ({"left": 0}, 300, function () {isSliding = false;});
				}
			}
		}
		//垂直滑动
		else {

			//防止在向下拉扯时，连续点击无法回弹问题
			if (curContentBoxSlideStat.top >= 0 && diff_Y >= 0){
				curContentBox.animate ({"top": 0}, 300, function () {
					isSliding = false;
					win.SendRMTEventToApp ("RMTClickEvent.verticalSliding", [0]);   //转发百分比
				});
			}

			//防止在向上拉扯时，连续点击无法回弹问题
			else if (curContentBoxSlideStat.top <= limitTop && diff_Y <= 0){
				curContentBox.animate ({"top": limitTop}, 300, function () {
					isSliding = false;
					win.SendRMTEventToApp ("RMTClickEvent.verticalSliding", [1]);   //转发百分比
				});
			}

			//松手之后的缓动滑行逻辑
			else {

				var t = endTime - startTime;    //手指滑动的距离
				var v = diff_Y / t; //手指离开屏幕之后的 移动速度
				var intergrator = 0;
				var i = 0.9;    //平均减速量

				if (diff_Y > 0) {
					interDeceleration = setInterval (function () {
						v = v * i;  //匀速降低
						intergrator += v * 30;  //每15毫秒的移动距离
						curContentBox.css ("top", curContentBoxSlideStat.top + intergrator);

						//速度降低到 0.1 或者已经 拉倒顶部，就停止滑动
						if (v <= 0.1 || curContentBoxSlideStat.top + intergrator > 0) {
							clearInterval (interDeceleration);
							isSliding = false;

							//如果在最顶部，就执行回弹，回弹结束之后发送 停止坐标 到 远程端
							if (curContentBoxSlideStat.top + intergrator > 0) {
								curContentBox.animate ({"top": 0}, 300, function () {
									isSliding = false;
									win.SendRMTEventToApp ("RMTClickEvent.verticalSliding", [0]);   //转发百分比
								});
							}
							else {
								win.SendRMTEventToApp ("RMTClickEvent.verticalSliding", [curContentBoxSlideStat.top + intergrator / limitTop]); //转发百分比
							}
						}

					}, 15);
				}
				else {
					interDeceleration = setInterval (function () {
						v = v * i;  //匀速降低
						intergrator += v * 30;  //每15毫秒的移动距离（累加）
						curContentBox.css ("top", curContentBoxSlideStat.top + intergrator);

						//速度降低到 -0.1 或者已经 拉倒底部，就停止滑动
						if (v >= -0.1 || curContentBoxSlideStat.top + intergrator < limitTop) {
							clearInterval (interDeceleration);
							isSliding = false;

							//如果在最底部，就执行回弹，回弹结束之后发送 停止坐标 到 远程端
							if (curContentBoxSlideStat.top + intergrator < limitTop) {
								curContentBox.animate ({"top": limitTop}, 300, function () {
									isSliding = false;
									win.SendRMTEventToApp ("RMTClickEvent.verticalSliding", [1]);   //转发百分比
								});
							}
							else {
								win.SendRMTEventToApp ("RMTClickEvent.verticalSliding", [curContentBoxSlideStat.top + intergrator / limitTop]); //转发百分比
							}

						}

					}, 15);
				}
			}

		}
	};

	//nav点击事件
	$("#index_page_first_ccdp").on("click",function(e){
		console.log("the click event is work");
		var curTargetIndex = $(e.target).index("a");
		RMTClickEvent.horizontalSliding(curTargetIndex);
		win.SendRMTEventToApp("RMTClickEvent.horizontalSliding",[curTargetIndex]);  //转发当前页面下标
	});

	//content触摸事件
	scrollBodyController.on (CONSTANT.EVENT_TYPE.START, function (e) {
		startTime = e.timeStamp;
		e.preventDefault ();
		clearInterval (verticalScrollingWatcher);
		clearInterval (interDeceleration);
		clearTimeout (horizontalScrollingTimer);

		scroll_start_X = e.originalEvent.changedTouches[0].pageX;
		scroll_start_Y = e.originalEvent.changedTouches[0].pageY;


		curContentBoxSlideStat.left = parseFloat (scrollBodyController.css ("left"));   //获取 展示窗体 的left值
		curContentBox = $(contentBoxes[Math.abs(curContentBoxSlideStat.left)/pageWidth]);   //获取当前 正文内容盒子
		curContentBoxSlideStat.top = parseFloat (curContentBox.css ("top"));    //获取当前 正文内容盒子 的top值
		curShoeLeft = parseFloat (slidingShoe.css ("left"));    //获取当前 导航滑动块 的left值
		limitTop = -(curContentBox.height() - pageHeight) - topHeight;
		slidingShoe.stop ();
		curContentBox.stop ();
		scrollBodyController.stop ();
	});

	context_main.on (CONSTANT.EVENT_TYPE.MOVE, function (e) {
		isSliding = true;
		//如果X轴未被冻结，就获取X轴信息；
		if (!freezeCoord_X) {
			scroll_move_X = e.originalEvent.changedTouches[0].pageX;
			diff_X = scroll_move_X - scroll_start_X;
		}

		//如果Y轴未被冻结，就获取Y轴信息；
		if (!freezeCoord_Y) {
			scroll_move_Y = e.originalEvent.changedTouches[0].pageY;
			diff_Y = scroll_move_Y - scroll_start_Y;
		}

		if (Math.abs(diff_X) >= pageWidth / 4) {
			freezeCoord_X = false;
			freezeCoord_Y = true;
			isVerticalScroll = false;
		}

		//一直监听X值和Y值的关系，如果 左右滑动的动作 大于 页面的1/8宽度+上下滚动的动作，就冻结上下滚动的坐标值，并且切换滚动模式为 左右滑动
		var diff_x_y = Math.abs (diff_X) - Math.abs (diff_Y);

		//上下滑动 弹力系统
		if (diff_x_y < 0 && isVerticalScroll) {

			if (curContentBoxSlideStat.top >= 0 && diff_Y > 0)
				curContentBox.css ("top", curContentBoxSlideStat.top + diff_Y*0.3);

			else if (curContentBoxSlideStat.top <= limitTop && diff_Y < 0)
				curContentBox.css ("top", curContentBoxSlideStat.top + diff_Y*0.3);

			else
				curContentBox.css ("top", curContentBoxSlideStat.top + diff_Y)

		}

		//左右滑动 弹力系统
		else if (diff_x_y > 0 && !isVerticalScroll) {

			//向右滑动
			if (diff_X > 0) {
				scrollBodyController.css ("left", curContentBoxSlideStat.left + diff_X*0.3);
				slidingShoe.css ("left", curShoeLeft - diff_X*0.3 / 2);
			}

			//向左滑动
			else if (diff_X < 0) {
				scrollBodyController.css ("left", curContentBoxSlideStat.left + diff_X*0.3);
				slidingShoe.css ("left", curShoeLeft + diff_X*0.3 / 2);
			}
		}
	});

	context_main.on (CONSTANT.EVENT_TYPE.END, function (e) {
		curContentBoxSlideStat.top = parseFloat (curContentBox.css ("top"));
		scroll_end_X = e.originalEvent.changedTouches[0].pageX;
		scroll_end_Y = e.originalEvent.changedTouches[0].pageY;
		diff_X = scroll_end_X - scroll_start_X;
		diff_Y = scroll_end_Y - scroll_start_Y;
		endTime = e.timeStamp;


		//模拟点击事件，手指触摸到离开的距离小于10，并且事件小于120，就可以触发点击事件
		if (Math.abs(diff_X) <= 10 && Math.abs(diff_Y) <= 10 && (endTime - startTime <= 120)) {

			var curTarget = $ (e.target);
			var a_tag = curTarget.parents ("li").find ("a");

			//由于start事件已经阻止默认事件，所以在这里模拟点击跳转事件
			if (a_tag.length) {

				//Active事件
				a_tag.css ("background", "#4283bf");
				setTimeout (function () { a_tag.css ("background", "transparent") }, 500);
				location.href = a_tag[0].href;

				//获取点击坐标
				CONSTANT.CLICK_POSITION._X = scroll_end_X/pageWidth;
				CONSTANT.CLICK_POSITION._Y = scroll_end_X/pageWidth;

				//远程同步
				win.SendRMTEventToApp ("RMTClickEvent.href", [a_tag[0].href]);
			}

		}

		horizontalScrollingTimer = setTimeout (function () {
			freezeCoord_X = false;
			freezeCoord_Y = false;
			isVerticalScroll = true;
		}, 300);

		handleReset ();
	});

	//远程执行事件
	win.RMTClickEvent.horizontalSliding = function(index){
		scrollBodyController.animate ({"left": -(index * pageWidth)}, 300);
		slidingShoe.animate({"left":index * pageWidth/2},300);
	};

	win.RMTClickEvent.verticalSliding = function(offsetPercent){
		curContentBox.animate ({"top": offsetPercent * limitTop}, 300);
	};

	win.RMTClickEvent.href = function(href){
		location.href = href;
	};

}) ();
