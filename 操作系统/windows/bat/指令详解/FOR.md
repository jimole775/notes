# 批处理（bat文件）for用法详解
对一组文件中的每一个文件执行某个特定命令。

`FOR %variable IN (set) DO command [command-parameters]`

- `%variable` 指定一个单一字母可替换的参数。
- `(set)` 指定一个或一组文件。可以使用通配符。
- `command` 指定对每个文件执行的命令。
- `command-parameters` 为特定命令指定参数或命令行开关。

在批处理程序中使用 FOR 命令时，指定变量请使用 %%variable，而不要用 %variable。

如果启用命令扩展，则会支持下列 FOR 命令的其他格式:

1. `FOR /D %variable IN (set) DO command [command-parameters]`

如果集中包含通配符，则指定与目录名匹配，而不与文件名匹配。

2. `FOR /R [[drive:]path] %variable IN (set) DO command [command-parameters]`
    检查以 [drive:]path 为根的目录树，指向每个目录中的 FOR 语句。
    如果在 /R 后没有指定目录规范，则使用当前目录。如果集仅为一个单点(.)字符，则枚举该目录树。

3. `FOR /L %variable IN (start,step,end) DO command [command-parameters]`
    该集表示以增量形式从开始到结束的一个数字序列。因此，(1,1,5)将产生序列
    1 2 3 4 5，(5,-1,1)将产生序列(5 4 3 2 1)
``` bat
FOR /F ["options"] %variable IN (file-set) DO command [command-parameters]

FOR /F ["options"] %variable IN ("string") DO command [command-parameters]

FOR /F ["options"] %variable IN ('command') DO command [command-parameters]
```

或者，如果有 usebackq 选项:
``` bat
FOR /F ["options"] %variable IN (file-set) DO command [command-parameters]

FOR /F ["options"] %variable IN ("string") DO command [command-parameters]

FOR /F ["options"] %variable IN ('command') DO command [command-parameters]
```

`file-set` 为一个或多个文件名。继续到 `file-set` 中的下一个文件之前，每份文件都被打开、读取并经过处理。处理包括读取文件，将其分成一行行的文字，然后将每行解析成零或更多的符号。然后用已找到的符号字符串变量值调用 For 循环。 以默认方式，/F 通过每个文件的每一行中分开的第一个空白符号。跳过空白行。您可通过指定可选 "options" 参数替代默认解析操作。这个带引号的字符串包括一个或多个指定不同解析选项的关键字。

这些关键字为:

- `eol=c` 指一个行注释字符的结尾(就一个)
- `skip=n` 指在文件开始时忽略的行数。
- `delims=xxx` 指分隔符集。这个替换了空格和跳格键的默认分隔符集。
- `tokens=x,y,m-n`
指每行的哪一个符号被传递到每个迭代的 for 本身。
这会导致额外变量名称的分配。m-n 格式为一个范围。
通过 nth 符号指定 mth。如果 符号字符串中的最后一个字符星号，
那么额外的变量将在最后一个符号解析之后分配并接受行的保留文本。

- `usebackq`
指定新语法已在下类情况中使用:
在作为命令执行一个后引号的字符串并且一个单引号字符为文字字符串命令并允许在 file-set 中使用双引号扩起文件名称。


4. `FOR /F "usebackq delims==" %i IN (`set`) DO @echo %i`

某些范例可能有助:

`FOR /F "eol=; tokens=2,3* delims=, " %i in (myfile.txt) do @echo %i %j %k`

会分析 myfile.txt 中的每一行，忽略以分号打头的那些行，将每行中的第二个和第三个符号传递给 for 函数体，用逗号和/或空格分隔符号。

请注意，此 for 函数体的语句引用 %i 来获得第二个符号，引用 %j 来获得第三个符号，引用 %k 来获得第三个符号后的所有剩余符号。

对于带有空格的文件名，您需要用双引号将文件名括起来。

为了用这种方式来使用双引号，还需要使用 usebackq 选项，否则，双引号会被理解成是用作定义某个要分析的字符串的。

%i 在 for 语句中显式声明，%j 和 %k 是通过tokens= 选项隐式声明的。

可以通过 tokens= 一行，指定最多 26 个符号，只要不试图声明一个高于字母 "z" 或 "Z" 的变量。

请记住，FOR 变量是单一字母、分大小写和全局的变量； 而且，不能同时使用超过 52 个。还可以在相邻字符串上使用 FOR /F 分析逻辑，方法是，用单引号将括号之间的 file-set 括起来。

这样，该字符串会被当作一个文件中的一个单一输入行进行解析。

最后，可以用 FOR /F 命令来分析命令的输出。

方法是，将括号之间的 file-set 变成一个反括字符串。该字符串会被当作命令行，传递到一个子 CMD.EXE，其输出会被捕获到内存中，并被当作文件分析。

如以下例子所示:

会枚举当前环境中的环境变量名称。

另外，FOR 变量参照的替换已被增强。

您现在可以使用下列选项语法:
``` 
     %~I          - 删除任何引号(")，扩展 %I
     %~fI        - 将 %I 扩展到一个完全合格的路径名
     %~dI        - 仅将 %I 扩展到一个驱动器号
     %~pI        - 仅将 %I 扩展到一个路径
     %~nI        - 仅将 %I 扩展到一个文件名
     %~xI        - 仅将 %I 扩展到一个文件扩展名
     %~sI        - 扩展的路径只含有短名
     %~aI        - 将 %I 扩展到文件的文件属性
     %~tI        - 将 %I 扩展到文件的日期/时间
     %~zI        - 将 %I 扩展到文件的大小
     %~$PATH:I   - 查找列在路径环境变量的目录，并将 %I 扩展
                   到找到的第一个完全合格的名称。如果环境变量名
                   未被定义，或者没有找到文件，此组合键会扩展到
                   空字符串
```

可以组合修饰符来得到多重结果:
```
     %~dpI       - 仅将 %I 扩展到一个驱动器号和路径
     %~nxI       - 仅将 %I 扩展到一个文件名和扩展名
     %~fsI       - 仅将 %I 扩展到一个带有短名的完整路径名
     %~dp$PATH:I - 搜索列在路径环境变量的目录，并将 %I 扩展
                   到找到的第一个驱动器号和路径。
     %~ftzaI     - 将 %I 扩展到类似输出线路的 DIR
```

在以上例子中，%I 和 PATH 可用其他有效数值代替。
%~ 语法用一个有效的 FOR 变量名终止。
选取类似 %I 的大写变量名比较易读，而且避免与不分大小写的组合键混淆。