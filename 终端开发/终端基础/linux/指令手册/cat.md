# cat命令是linux下的一个文本输出命令，通常是用于观看某个文件的内容的

cat主要有三大功能：

1. 一次显示整个文件。
    ``` bash
    $ cat filename
    ```
2. 从键盘创建一个文件。
    ```bash
    $ cat > filename #只能创建新文件,不能编辑已有文件.
    ```

3. 将几个文件合并为一个文件。
    ``` bash
    $ cat file1 file2 > file
    ```

4. 将几个文件合并为一个文件。
    ``` bash
    $ cat file1 file2 > file
    ```

- cat具体命令格式为: 
    ``` bash
    $ cat [-AbeEnstTuv] [--help] [--version] fileName
    ```
说明：把档案串连接后传到基本输出 (屏幕或加 > fileName 到另一个档案)

参数：

-n 或 –number 由 1 开始对所有输出的行数编号

-b 或 –number-nonblank 和 -n 相似，只不过对于空白行不编号

-s 或 –squeeze-blank 当遇到有连续两行以上的空白行，就代换为一行的空白行

-v 或 –show-nonprinting

范例：

`cat -n linuxfile1 > linuxfile2` 把 linuxfile1 的档案内容加上行号后输入 linuxfile2 这个档案里

`cat -b linuxfile1 linuxfile2 >> linuxfile3` 把 linuxfile1 和 linuxfile2 的档案内容加上行号(空白行不加)之后将内容附加到linuxfile3 里。

范例：

把 linuxfile1 的档案内容加上行号后输入 linuxfile2 这个档案里
``` bash
$ cat -n linuxfile1 > linuxfile2
```

把 linuxfile1 和 linuxfile2 的档案内容加上行号(空白行不加)之后将内容附加到 linuxfile3 里。

``` bash
$ cat -b linuxfile1 linuxfile2 >> linuxfile3
$ cat /dev/null > /etc/test.txt #此为清空 /etc/test.txt 档案内容
```