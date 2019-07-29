

第一种情况 
=======================【是表格被文本（英文单词）或者padding值撑破了】===========================
其实就是需要文本处理换行，还有固定尺寸（overflow:auto）

style="overflow:auto;word-wrap:break-word;word-break:break-all;"


第二种情况
=======================【当往表格里放一张被表格大得多的图片时，表格照样还是被撑破了】===========================
解决办法有2种:

1、把表格的风格设置为：
 style="overflow:auto; word-wrap:break-word; word-break:break-all;TABLE-LAYOUT: fixed;"

记得要为表格设置宽度大小，但TABLE-LAYOUT: fixed设置了的话，对于表格布局将会很困难，推荐使用第2种解决办法。

2、解决办法是从图片本身入手：

给图片的风格属性设置为
 style="max-width: 500px; width:expression(this.width > 500 ? "500px" : this.width)"
后来我发现上述代码改写一下就可以做到既防止表格/层撑破又防止单词断裂了。 
代码 
table {  
table-layout: fixed;  
word-wrap:break-word;  
}  
div {  
word-wrap:break-word;  
} 
补充
table {    
word-break:break-all;
word-wrap:break-word;
}
 
img {
    max-width: 500px;
    width:expression(this.width > 500 ? "500px" : this.width)
   }
补充:
语法： 
word-break : normal &#124; break-all &#124; keep-all
参数： 
normal : 　依照亚洲语言和非亚洲语言的文本规则，允许在字内换行 
break-all : 　该行为与亚洲语言的normal相同。也允许非亚洲语言文本行的任意字内断开。该值适合包含一些非亚洲文本的亚洲文本 
keep-all : 　与所有非亚洲语言的normal相同。对于中文，韩文，日文，不允许字断开。适合包含少量亚洲文本的非亚洲文本
语法：
word-wrap : normal &#124; break-word
参数：
normal : 　允许内容顶开指定的容器边界
break-word : 　内容将在边界内换行。如果需要，词内换行（word-break）也行发生
说明：
设置或检索当当前行超过指定容器的边界时是否断开转行。
语法：
table-layout : auto &#124; fixed
参数：
auto : 　默认的自动算法。布局将基于各单元格的内容。表格在每一单元格读取计算之后才会显示出来。速度很慢
fixed : 　固定布局的算法。在这算法中，水平布局是仅仅基于表格的宽度，表格边框的宽度，单元格间距，列的宽度，而和表格内容无关