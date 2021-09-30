#coding=utf-8
import http.client, urllib.parse
import http.client, urllib.parse
import random

USER_AGENTS = [
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; AcooBrowser; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)",
  "Mozilla/4.0 (compatible; MSIE 7.0; AOL 9.5; AOLBuild 4337.35; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
  "Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)",
  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0)",
  "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 1.0.3705; .NET CLR 1.1.4322)",
  "Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.2; .NET CLR 1.1.4322; .NET CLR 2.0.50727; InfoPath.2; .NET CLR 3.0.04506.30)",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.3 (Change: 287 c9dfb30)",
  "Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.2pre) Gecko/20070215 K-Ninja/2.1.1",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9) Gecko/20080705 Firefox/3.0 Kapiko/3.0",
  "Mozilla/5.0 (X11; Linux i686; U;) Gecko/20070322 Kazehakase/0.4.5",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20",
  "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52",
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
]

def get_demo():
    # 参数
    params = urllib.parse.urlencode({})
    # 请求头
    headers = {'Referer': 'http://t66y.com/index.php', 'User-Agent': random.choice(USER_AGENTS), 'Accept-Language': 'zh-CN,zh;q=0.9', 'Cookie': '_yapi_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEzNCwiaWF0IjoxNTkyMzYyMzkzLCJleHAiOjE1OTI5NjcxOTN9.7MjJ3SR39Ul-QNBXkl5WjtLfuth13FDccAnimukvN8o; _yapi_uid=134'}
    # @param host, port, options 如果是域名，就不需要端口号
    conn = http.client.HTTPConnection('100.27.30.111', '3000', timeout=10)
    # @param method, path?qury, params, headers
    conn.request('GET', '/api/interface/get?id=6785', params, headers)
    # res session
    res = conn.getresponse()

    # print(res.read())
    # html = res.read()
    # data = html.decode('gbk')  # This will return entire content.
    # content = data.find(keyword)

    if res != -1 & res.status == 200:
        # res.read() 读出返回的二进制数据
        print('bingo:', res.read().decode("utf-8"))
    else:
        print('fail conn')

def post_demo():
    conn = http.client.HTTPConnection("httpbin.org") # 直接用域名
    data = '{"name":"张三", "age": 12}'.encode('utf-8') # 或data = json.dumps({"name":"张三", "age": 12})
    headers = {"Content-Type": "application/json"}
    conn.request("POST", '/post', data, headers)
    res = conn.getresponse()
    print(res.read().decode("utf-8"))
    conn.close()

if __name__ == '__main__':
	pass

get_demo()
