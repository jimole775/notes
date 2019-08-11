videos元素的书写很直接：
``` js
<video src="www.youku.com/SDADSD==.mp4"></video>
```
当然也可以支持多种格式兼容，检查顺序为从上至下，如果有一条支持，后面的就会被忽略
``` js
<video>

<!--type为播放文件MIME类型，codes为播放文件的编码格式-->
<source src="sample.ogv" type="video/ogg; codes='theora,vorvis'">
<source src="sample.mov" type="video/quicktime">

</video>
```

# 属性列表

- src 
``` html 
<video src='http://v.qq.com/xxx'></video>
```
- autoplay 
``` html 
<video autoplay></video>
```
- preload	 
none,metadata(预加载第一帧，媒体字节数，播放列表，持续时间等),auto

- poster	//当视频不可播放时的替代内容

- loop
``` html 
<!-- 循环播放 -->
<video autoplay loop></video>	
```

- controls	
``` html 
<!-- 是否开启浏览器自带播放器的进度条 -->
<video autoplay loop></video>	
```

- error	

只读属性，当播放过程出现错误时，会返回拥有四个错误值的MediaError对象，可以对video元素使用addEventListener对错误进行捕捉
1. “1”下载过程中被用户中止；
2. “2”下载过程中网络出现异常
3. “3”解码错误
4. “4”媒体格式不被支持


- networkState	

//只读属性，一样有四个值
1. “0”，元素处于初始状态
2. “1”，浏览器已经选择好用什么编码格式来播放媒体，但是网络未连接
3. “2”，媒体数据加载中
4. “3”，没有支持的编码格式，不执行加载；

- currentSrc		

- buffered	//	

- readyState

- seeking  && seekable

- currentTime && startTime && duration

- played && paused && ended

- defaultPlaybackRate && playbackRate

- volume && muted


# 方法列表

- play

- pause

- load

- canPlayType






