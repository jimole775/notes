/**
 * Created by Andy on 2017/1/9.
 */
(function(){
document.body.innerHTML += [
	'<div id="AppConsole" draggable="true" class="app-console">',
	'   <div id="AppConsoleHead"  class="app-console-head">',
	'       <button id="_save"  class="_save">保存</button>',
	'       <button id="_close"  class="_close">关闭</button>',
	'   </div>',
	'   <div class="app-console-body-form">',
	'       <ul id="AppConsoleBody"  class="app-console-body"></ul>' ,
	'       <div id="consolePlatform"  class="console-platform">' ,
	'           <textarea wrap="hard"></textarea>' ,
	'       </div>' ,
	'       <div id="hoverButtonBox" class="hover-button-box">' ,
	'           <img id="clearButton" class="clear-button" width="100%" src="./images/clear.png">' ,
	'           <img id="scrollToBottomButton" class="scrollTo-bottom-button" width="100%"  src="./images/downDec.png">' ,
	'       </div>' ,
	'       <i id="extendFunTag" class="extend-fun-tag"></i>' ,
	'       <div id="extendFunTagHook" class="extend-fun-tag-hook"></div>' ,
	'   </div>',
	'   <div id="consoleCMDs" class="data-box console-CMDs">' ,
	'       <table>',
	'           <tbody>',
	//'               <tr><td>发送数据给DEV</td></tr>',
	//'               <tr><td>发送数据给APP</td></tr>',
	//'               <tr><td>关闭加载遮罩</td></tr>',
	//'               <tr><td>开启加载遮罩</td></tr>',
	'           </tbody>' ,
	'       </table>',
	'   </div>',
	'</div>' ,
	'<div id="clickFlagTier" class="click-flag-tier">' ,
	'<div class="table-cell"><img src="./images/light.png" width="50%" style="display: block;margin:0 auto"></div>' ,
	'</div>',
	'<div id="activeTier" class="active-tier"></div>'
].join('');
})();