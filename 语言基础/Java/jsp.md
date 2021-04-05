
``` jsp
<s:if test="a==2">

/**********循环体***********/
<s:iterator value="modelNotices" var="notices">
	<li>
    <h2>${realNotice}</h2>
    <span>${noticeDate}</span>
  </li>
  </s:iterator>
/**********获取组件***********/

ext.getCmp();
```
