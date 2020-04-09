<a href="javascript:location.reload();">点击重新载入页面</a>
<a href="javascript:history.go(0);">点击重新载入页面</a>
<a href="javascript:location=location;">点击重新载入页面</a>
<a href="javascript:location=location.href;">点击重新载入页面</a>
<a href="javascript:location.replace(location);">点击重新载入页面</a>
<a href="javascript:location.replace(location.href);">点击重新载入页面</a>
<a href="javascript:location.assign(location);">点击重新载入页面</a>
<a href="javascript:location.assign(location.href);">点击重新载入页面</a>
<!--// 以下只支持ie -->
<a href="javascript:document.URL=location.href;">点击重新载入页面</a>
<a href="javascript:navigate(location);">点击重新载入页面</a>
<a href="javascript:document.execCommand('Refresh');">点击重新载入页面</a>
<!--// 以上只支持ie -->


其实也就是对url的处理

location.href = location.href也可以实现刷新