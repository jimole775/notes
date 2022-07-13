1. 打开 Fiddler => Tools => HTTPS, 勾选 "Capture HTTPS CONNECTs" 和 "Decrypt HTTPS traffic"

2. 点击 Actions，选择 "Trust Root Certificate"，安装证书。 

3. 切换到 Connections 页签，勾选 "Allow remote computers to connect"

4. 在 Fiddler 的右边窗口，找到 "FiddlerScript" 页签，在 Go to: 下拉框 中，勾选 "OnBeforeRequest"，然后拉到这个类的最后一行，加入一下代码，然后点击 Save Script.

``` js
var hosts = 'zkd.me develop.dog';
FiddlerApplication.Log.LogFormat("Logger session {0}, Url: {1}, isHttps: {2}, port: {3}", oSession.id, oSession.fullUrl, oSession.isHTTPS, oSession.port);
if (hosts.indexOf(oSession.host) > -1) {
   FiddlerApplication.Log.LogFormat("Capture session {0}, Url: {1}, isHttps: {2}, port: {3}", oSession.id, oSession.fullUrl, oSession.isHTTPS, oSession.port);
   if (oSession.HTTPMethodIs('CONNECT')) {
       FiddlerApplication.Log.LogString('create fake tunnel response');
       oSession['x-replywithtunnel'] = 'FakeTunnel';
       return;
   }

   if (oSession.isHTTPS) {
       FiddlerApplication.Log.LogString('switch https to http request');
       oSession.fullUrl = oSession.fullUrl.Replace("https://","http://");
       oSession.port = 80;
   }

   FiddlerApplication.Log.LogFormat("Processed session {0}, Url: {1}, isHttps: {2}, port: {3}", oSession.id, oSession.fullUrl, oSession.isHTTPS, oSession.port);
}
FiddlerApplication.Log.LogFormat("Logger session {0}, Url: {1}, isHttps: {2}, port: {3}", oSession.id, oSession.fullUrl, oSession.isHTTPS, oSession.port);
```