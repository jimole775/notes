# 两种方法：

## 1. 直接在当前盘符下使用字符串形式把绝对路径包起来
   比如 `cd C:\"Documents and Settings"`

## 2. 使用省略形式
   比如  `"Documents and Settings" -- DOCUME~1`
         `"Local Settings" -- LOCALS~1` (注意略去空白，用了第二个词的字母，凑成六个，再加波浪号和1)。

如果多个文件前6字符一样怎么办？为什么最后是1而不是0或者其他数字呢？看看这个例子

假设下面是你的C盘根目录中的文件夹：
> Program Files

> Progra file

> Progra zhang

则三个目录分别表示为：
> C:\Progra~1;

> C:\Progra~2;

> C:\Progra~3;
