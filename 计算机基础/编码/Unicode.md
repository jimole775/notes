`unicode` 是国际码，一个字符集，涵盖到所有字符的映射，包括各国的文字，和各种特殊字符，表情，图标字体

`unicode` 以【固定两字节为一个单位】存储字符，空出的位数以0来补位！（在第二个版本中变成最多3字节了，以后还会持续增加）

有 `little endian` 和 `big endian` 两种编码类型

# big endian
大头方式：因为每个字符都有两个字节，大的在前面，就是大头方式存储

# little endian
小头方式：小的在前面，就是小头方式存储

# 举例
“严”的unicode码是：4E25，如果存储方式是big endian就是4E25，如果是254E，就是little endian，同理可证每一个字符

# 判断一个文件使用大小头的方法
每个文件的最前面都会加入【FE FF】两个字节，如果FE在前面，就是小头，如果FF在前面，就是大头

# 备注
js中的charCodeAt, codeAt, fromCharCode方法都是以unicode为基础进行计算的！！

