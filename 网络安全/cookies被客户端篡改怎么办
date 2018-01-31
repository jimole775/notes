做网站难免要面对安全性的问题，诸如sql注入拉，cookie冒名拉，等等，sql注入算是老生常谈，翻翻旧账有不少优秀的帖子在说明这个问题，所以我们来说说Session冒名顶替的风险以及应对的办法。
首先要说Session冒名顶替，就得说说Session的原理。Session是一个在服务器端保持会话的机制，其实在Http协议里并没有规定 Session这个东西，所以他的实现方式就有点千奇百怪，不同的Web框架下Session的实现机制都是不一样的。但是原理都是大同小异的，这里普遍应用的机制是通过Cookie来存储一个会话的票据（也就是SessionID），服务端在cookie里取得SessionID后就去存储 Session的后端（可以是进程里，数据库，或者其他任何可以存储数据的东西，包括文件）去获取这个会话的数据。
我们用一个抓包工具来获取一段数据看看，如下：
GET /w3/global/j/global.js HTTP/1.1 
Accept: */* 
Referer: http://www.jiayuan.com/login/index.php?pre_url=/usercp 
Accept-Language: zh-cn 
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; EmbeddedWB 14.52 from: http://www.bsalsa.com/ EmbeddedWB 14.52) 
Host: images.jiayuan.com 
Connection: Keep-Alive 
Cookie: SESSION_HASH=aa200d999de428f8e84ad56f4fc0afb9ac88fb78; stadate1=25727411; myloc=53%7C5301; myage=24; mysex=m; myuid=25727411; myincome=30; last_login_time=1277561249; new_msg=0; pop_1268278480=1277575662747; pop_time=1277561290653

标红字的地方就是SessionID了，当然ASP.NET有一种Cookieless的机制，是把这个ID放在url里传递。
这里就有一个问题，这个ID在非SSL的环境下提交是明文的，所以如果这个ID被窃取，然后就可以冒名顶替别人的身份了（注：大多数框架的设计中 Session一旦被创建后，SessionID的值就固定了，不会变）。
这涉及到Web开发中的一个说法，就是客户端的任何输入都是不可信的，所以Cookie作为在客户端保留的数据，在没有防篡改机制的保护下，其内容也是不可信任的。一旦信任了这样的数据，就会存在一个安全上的隐患。
那么如何来防范呢，这里我们需要实现cookie防篡改的功能。Cookie防篡改功能的原理很简单。假设我有一个值要写入Cookie
key="user_name" value="alexander"
如果需要防止这个值被篡改成其他的值是不可能的，因为cookie已经写到了客户端，别人可以随意的改，服务器是没办法阻止的，但是我们可以用防篡改的机制来让服务器知道cookie的值被篡改过。所以在向客户端发送cookie的时候就不能原样发回去了，我们在Cookie的值后面跟上一段防篡改的验证串，整个作为一个整体发送到客户端。所以客户端得到的cookie可能就是这个样子：
user_name=alexander|ab95ef23cc6daecc475de
用|分割的后面部分就是验证串，也可以叫防篡改验证串。它是这样生成的， DES(cookie的内容+盐值)
也可以用 MD5（cookie内容+密钥）也可以是SHA1（cookie内容+密钥），这里的密钥只有站点本身知道，如果这个都泄漏了那就真完蛋了。这个值在服务器接收到Cookie以后，就可以用Cookie的内容+密钥重新计算一次验证串，和提交上来的做比对，如果是一致的，我们就认为cookie没有被篡改，反之，cookie肯定被篡改过，我们就不要相信这一次提交。如果所有的Cookie都经过防篡改验证，那么也就不用担心SessionID被冒名顶替的事情发生了。
