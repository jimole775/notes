# koa-body 的基本参数
|参数名|描述|类型|默认值|
|-----:|:----:|:-----:|:----:|
patchNode|将请求体打到原生 node.js 的ctx.req中|Boolean|false
patchKoa|将请求体打到 koa 的 ctx.request 中|Boolean|true
jsonLimit|JSON 数据体的大小限制|String / Integer|1mb
formLimit|限制表单请求体的大小|String / Integer|56kb
textLimit|限制 text body 的大小|String / Integer|56kb
encoding|表单的默认编码|String|utf-8
multipart|是否支持 multipart-formdate 的表单|Boolean|false
urlencoded|是否支持 urlencoded 的表单|Boolean|true
text|是否解析 text/plain 的表单|Boolean|true
json|是否解析 json 请求体|Boolean|true
jsonStrict|是否使用 json 严格模式，true 会只处理数组和对象|Boolean|true
formidable|配置更多的关于 multipart 的选项|Object|{}
onError|错误处理|Function|function(){}
stict|严格模式,启用后不会解析  GET, HEAD, DELETE 请求|Boolean|true

# formidable 的基础参数
|参数名|描述|类型|默认值|
|-----:|:----:|:-----:|:----:|
maxFields|限制字段的数量|Integer|1000
maxFieldsSize|限制字段的最大大小|Integer|2 * 1024 * 1024
uploadDir|文件上传的文件夹|String|os.tmpDir()
keepExtensions|保留原来的文件后缀|Boolean|false
hash|如果要计算文件的 hash，则可以选择 md5/sha1|String|false
multipart|是否支持多文件上传|Boolean|true
onFileBegin|文件上传前的一些设置操作|Function|function(name,file){}