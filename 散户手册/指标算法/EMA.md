EMA(X, N) 指数平滑移动平均
表达式：当日指数平均值 = 平滑系数 * （当日指数值 - 昨日指数平均值）+ 昨日指数平均值


EMA(X, N) = 2*X/(N + 1) + (N - 1)/(N + 1) * 昨天的指数收盘平均值

X：变量，比如： Close, open, high, low
N: 周期，比如：N = 1，就是1天

## 参考：
https://zhidao.baidu.com/question/1671836284767940787.html
http://www.360doc.com/content/17/1115/20/5522505_704140432.shtml