# 批处理for命令详解
FOR这条命令基本上都被用来处理文本,但还有其他一些好用的功能!
看看他的基本格式(这里我引用的是批处理中的格式,直接在命令行只需要一个%号)

>*FOR 参数 %%变量名 IN (相关文件或命令) DO 执行的命令*

## 参数:

FOR有4个参数 `/d /l /r /f` 他们的作用我在下面用例子解释
- **%%变量名**: 这个变量名可以是小写a-z或者大写A-Z,他们区分大小写,FOR会把每个读取到的值给他;

- **IN**: 命令的格式,照写就是了;

- (**相关文件或命令**) :FOR要把什么东西读取然后赋值给变量,看下面的例子

- **do**: 命令的格式,照写就是了!

- **执行的命令**:对每个变量的值要执行什么操作就写在这.

可以在`CMD`输入`for /?`看系统提供的帮助!对照一下

``` bash
FOR %%variable IN (set) DO command [command-parameters]
%%variable   #指定一个单一字母可替换的参数。
(set)    #指定一个或一组文件。可以使用通配符。
command  #指定对每个文件执行的命令。
command-parameters #为特定命令指定参数或命令行开关。
```
现在开始讲每个参数的意思
## /d 仅为目录 

如果 Set (也就是我上面写的 "相关文件或命令") 包含通配符（* 和 ?），将对与 Set 相匹配的每个目录（而不是指定目录中的文件组）执行指定的 Command。

系统帮助的格式:`FOR /D %%variable IN (set) DO command`

他主要用于目录搜索,不会搜索文件,看这样的例子
``` bash
@echo off
for /d %%i in (*) do @echo %%i
pause
```
把他保存放在C盘根目录执行,就会把C盘目录下的全部目录名字打印出来,而文件名字一个也不显示!
在来一个,比如我们要把当前路径下文件夹的名字只有1-3个字母的打出来
``` bash
@echo off
for /d %%i in (???) do @echo %%i
pause
```
这样的话如果你当前目录下有目录名字只有1-3个字母的,就会显示出来,没有就不显示了

- 思考题目:
```  bash
@echo off
for /d %%i in (window?) do @echo %%i
pause
```
保存到C盘下执行,会显示什么呢?自己看吧!

>/D *参数只能显示当前目录下的目录名字,这个大家要注意!*

## /R 递归 

进入根目录树 [Drive:]Path，在树的每个目录中执行 for 语句。

如果在 /R 后没有指定目录，则认为是当前目录。

如果 Set 只是一个句点 (.)，则只枚举目录树。

系统帮助的格式:`FOR /R [[drive:]path] %%variable IN (set) DO command`

上面我们知道

`/D` 只能显示当前路径下的目录名字,那么现在这个/R也是和目录有关,他能干嘛呢?

放心,他比 `/D` 强大多了!

他可以把当前或者你指定路径下的文件名字全部读取,注意是文件名字,有什么用看例子!
``` bash
@echo off
for /r c:/ %%i in (*.exe) do @echo %%i
pause
```
咋们把这个BAT保存到D盘随便哪里然后执行,我会就会看到,他把C盘根目录,和每个目录的子目录下面全部
的EXE文件都列出来了,这里的c:/就是目录了。

再来一个
``` bash
@echo off
for /r %%i in (*.exe) do @echo %%i
pause
```
参数不一样了，这个命令前面没加那个C:/也就是搜索路径,这样他就会以当前目录为搜索路径,比如你这个BAT你把他放在d:/test目录下执行,那么他就会把D:/test目录和他下面的子目录的全部EXE文件列出
来!!!

## /L 迭代数值范围 

使用迭代变量设置起始值 (Start#)，然后逐步执行一组范围的值，直到该值超过所设置的终止值 (End#)

/L 将通过对 `Start#` 与 `End#` 进行比较来执行迭代变量。如果 `Start#` 小于 `End#`，就会执行该命令。

如果迭代变量超过 `End#`，则命令解释程序退出此循环。还可以使用负的 `Step#` 以递减数值的方式逐步执行此范围内的值。

例如，(1,1,5) 生成序列 1 2 3 4 5，而 (5,-1,1) 则生成序列 (5 4 3 2 1)。

语法是： 

系统帮助的格式: `for /L %% Variable in (Start#,Step#,End#) do Command`

例如：
``` bash
@echo off
for /l %%i in (1,1,5) do @echo %%i
pause
```
保存执行看效果,他会打印从1 2 3 4 5   这样5个数字
(1,1,5)这个参数也就是表示从1开始每次加1直到5终止!

再看这个例子
``` bash
@echo off
for /l %%i in (1,1,5) do start cmd
pause
```
执行后是不是吓了一跳,怎么多了5个CMD窗口,呵呵!

如果把那个 (1,1,5)改成 (1,1,65535)会有什么结果,
我先告诉大家,会打开65535个CMD窗口....这么多你不死机算你强!

当然我们也可以把那个`start cmd`改成`md %%i`这样就会建立指定个目录了!!!名字为1-65535

看完这个被我赋予破坏性质的参数后,我们来看最后一个参数

## /f 

- 含有/F的for详细说明

含有/F的for有很大的用处，在批处理中使用的最多，用法如下：

格式：
``` bash
FOR /F ["options"] %%i IN (file) DO command
FOR /F ["options"] %%i IN ("string") DO command
FOR /F ["options"] %%i IN ('command') DO command
```
这个可能是最常用的，也是最强的命令，主要用来处理文件和一些命令的输出结果。

- **file** 代表一个或多个文件
- **string** 代表字符串
- **command** 代表命令
- **["options"]** 可选

对于 `FOR /F %%i IN (file) DO command`

`file` 为文件名，按照官方的说法是，`for` 会依次将 `file` 中的文件打开，并且在进行到下一个文件之前将每个文件读取到内存，按照每一行分成一个一个的元素，忽略空白的行，看个例子。

假如文件a.txt中有如下内容：
``` bash
第1行第1列 第1行第2列 第1行第3列
第2行第1列 第2行第2列 第2行第3列
第3行第1列 第3行第2列 第3行第3列
```
你想显示a.txt中的内容，会用什么命令呢？当然是`type，type a.txt
for`也可以完成同样的命令：

``` bash
for /f %%i in (a.txt) do echo %%i
```
还是先从括号执行，因为含有参数/f,所以for会先打开a.txt，然后读出a.txt里面的所有内容，把它作为一个集合，并且以每一行作为一个元素，所以会产生这样的集合

``` bash
{
    “第1行第1列 第1行第2列 第1行第3列”，  #第一个元素
    “第2行第1列 第2行第2列 第2行第3列”，  #第二个元素
    “第3行第1列 第3行第2列 第3行第3列”    #第三个元素
}
```

集合中只有3个元素，同样用%%i依次代替每个元素，然后执行do后面的命令。

具体过程：

1. 用%%i代替“第1行第1列 第1行第2列 第1行第3列”，

2. 执行do后面的echo %%i，显示“第1行第1列 第1行第2列 第1行第3列”，

3. 用%%i代替“第2行第1列 第2行第2列 第2行第3列”，

4. 执行echo %%i，显示“第2行第1列 第2行第2列 第2行第3列”，

5. 依次，直到每个元素都代替完为止。

为了加强理解/f的作用，请执行一下两个命令，对比即可明白：

``` bash
for /f %%i in (a.txt) do echo %%i #这个会显示a.txt里面的内容，因为/f的作用，会读出a.txt中 
的内容。
for %%i in (a.txt) do echo %%i #而这个只会显示a.txt这个名字，并不会读取其中的内容。
```

通过上面的学习，我们发现for /f会默认以每一行来作为一个元素，

但是如果我们还想把每一行再分解更小的内容，该怎么办呢？

不用担心，for命令还为我们提供了更详细的参数，使我们将每一行分为更小的元素成为可能。

它们就是：delims和tokens

delims 用来告诉for每一行应该拿什么作为分隔符，默认的分隔符是空格和tab键

比如，还是上面的文件，我们执行下面的命令：

``` bash
for /f "delims= " %%i in (a.txt) do echo %%i
```
显示的结果是：

``` bash
第1行第1列
第2行第1列
第3行第1列
```

为什么是这样的呢。因为这里有了delims这个参数，=后面有一个空格，意思是再将每个元素以空格分割，默认是只取分割之后的第一个元素。

执行过程是：

将 **第一个元素** “第1行第1列 第1行第2列 第1行第3列”分成**三个元素**：“第1行第1列” “第1行第2列” “第1行第3列”，它默认**只取第一个**，即“第1行第1列”，然后执行do后面的命令，依次类推。

但是这样还是有局限的，如果我们想要每一行的第二列元素，那又如何呢？

这时候，tokens跳出来说，我能做到。

它的作用就是当你通过delims将每一行分为更小的元素时，由它来控制要取哪一个或哪几个。

还是上面的例子，执行如下命令：

``` bash
for /f "tokens=2 delims= " %%i in (a.txt) do echo %%i
```
执行结果：

``` bash
第1行第2列
第2行第2列
第3行第2列
```

如果要显示第三列，那就换成tokens=3。

同时tokens支持通配符*，以及限定范围。

如果要显示第二列和第三列，则换成tokens=2,3或tokens=2-3,如果还有更多的则为：tokens=2-10之类的。

此时的命令为：

``` bash
for /f "tokens=2,3 delims= " %%i in (a.txt) do echo %%i %%j
```
怎么多出一个`%%j`？

这是因为你的`tokens`后面要取每一行的两列，用`%%i`来替换第二列，用`%%j`来替换第三列。

并且必须是按照英文字母顺序排列的，`%%j`不能换成`%%k`，因为i后面是j

执行结果为：

``` bash
第1行第2列 第1行第3列
第2行第2列 第2行第3列
第3行第2列 第3行第3列
```
对以通配符*，就是把这一行全部或者这一行的剩余部分当作一个元素了。
比如：

``` bash
for /f "tokens=* delims= " %%i in (a.txt) do echo %%i
```
执行结果为：

``` bash
第1行第1列 第1行第2列 第1行第3列
第2行第1列 第2行第2列 第2行第3列
第3行第1列 第3行第2列 第3行第3列
```
其实就跟`for /f %%i in (a.txt) do echo %%i`的执行结果是一样的。
再如：

``` bash
for /f "tokens=2,* delims= " %%i in (a.txt) do echo %%i %%j
```
执行结果为：

``` bash
第1行第2列 第1行第3列
第2行第2列 第2行第3列
第3行第2列 第3行第3列
```
用%%i代替第二列，用%%j代替剩余的所有
最后还有skip合eol，这俩个简单，skip就是要忽略文件的前多少行，而eol用来指定当一行以什么符号开始时，就忽略它。

比如：

``` bash
for /f "skip=2 tokens=*" %%i in (a.txt) do echo %%i
```
结果为:

第3行第1列 第3行第2列 第3行第3列
用skip来告诉for跳过前两行。

如果不加tokens=*的话，执行结果为：
```bash
第3行第1列
```

不知道怎么回事。
再如，当a.txt内容变成：
``` bash
第1行第1列 第1行第2列 第1行第3列
第2行第1列 第2行第2列 第2行第3列
第3行第1列 第3行第2列 第3行第3列
```

执行`for /f "eol=. tokens=*" %%i in (a.txt) do echo %%i`结果是：

``` bash
第3行第1列 第3行第2列 第3行第3列
```
用eol来告诉for忽略以“.”开头的行。
同样也必须加tokens=*，否则只会显示“第3行第1列

 
 
 
====================================================== 
# 终极dos批处理循环命令详解
- 格式：FOR [参数] %%变量名 IN (相关文件或命令)   DO 执行的命令
- 作用：对一个或一组文件，字符串或命令结果中的每一个对象执行特定命令，达到我们想要的结果。
- 注意：在批处理文件中使用 FOR 命令时，指定变量请使用 %%variable,而不要用 %variable。变量名称是区分大小写的，所以 %i 不同于 %I.
- 关于：for命令可以带参数或不带参数，带参数时支持以下参数:/d /l /r /f

下面分别解释一下
## 零：无参数时:

- FOR %variable IN (set) DO command [command-parameters]
- %variable  指定一个单一字母可替换的参数。
- (set)      指定一个或一组文件。可以使用通配符。
- command    指定对每个文件执行的命令。
- command-parameters 为特定命令指定参数或命令行开关。

TTT示例：
```bash
　　for %%i in (t*.*) do echo %%i #显示当前目录下与t*.*相匹配的文件(只显示文件名，不显示路径) 
　　for %%i in (d:/mydocuments/*.doc) do @echo %%i #显示d:/mydocuments/目录下与*.doc相匹配的文件
```

## 一、参数 /d (参数只能显示当前目录下的目录名字)

　　格式：`FOR /D %variable IN (set) DO command [command-parameters]`

　　这个参数主要用于目录搜索,不会搜索文件,/D 参数只能显示当前目录下的目录名字。(TTT特别说明：只会搜索指定目录下的目录，不会搜索再下一级的目录。)

　　TTT示例：
``` bash
　　for /d %%i in (c:/*) do echo %%i #显示c盘根目录下的所有目录
　　for /d %%i in (???) do echo %%i #显示当前目录下名字只有1-3个字母的目录
```

## 二、参数 /R (搜索指定路径及所有子目录中与set相符合的所有文件)

　　格式：`FOR /R [[drive:]path] %variable IN (set) DO command [command-parameters]`

　　此命令会搜索指定路径及所有子目录中与set相符合的所有文件，注意是指定路径及所有子目录。

1. set中的文件名如果含有通配符(？或*)，则列举/R参数指定的目录及其下面的所用子目录中与set相符合的所有文件，无相符文件的目录则不列举。

2. 如果set中为具体文件名，不含通配符，则枚举该目录树（即列举该目录及其下面的所有子目录）(并在后面加上具体的文件名)，而不管set中的指定文件是否存在。

例：`for /r c:/ %%i in (*.exe) do echo %%i` 

把C盘根目录,和每个目录的子目录下面全部的EXE文件都列出来了!!!!

　　TTT示例：
``` bash
　　for /r c:/ %%i in (boot.ini) do echo %%i #枚举了c盘所有目录
　　for /r d:/backup %%i in (1) do echo %%i #枚举d/backup目录
　　for /r c:/ %%i in (boot.ini) do if exist %%i echo %%i #很好的搜索命令，列举boot.ini存在的目录
```

## 三、参数 /L (该集表示以增量形式从开始到结束的一个数字序列。可以使用负的 Step)

　　格式：`FOR /L %variable IN (start,step,end) DO command [command-parameters]`

　　该集表示以增量形式从开始到结束的一个数字序列。可以使用负的 Step

　　TTT示例：
``` bash
　　for /l %%i in (1,1,5) do @echo %%i --输出1 2 3 4 5
　　for /l %%i in (1,2,10) do @echo %%i --输出1,3，5,7，9 
　　for /l %%i in (100,-20,1) do @echo %%i --输出100,80,60,40,20
　　for /l %%i in (1,1,5) do start cmd --打开5个CMD窗口
　　for /l %%i in (1,1,5) do md %%i --建立从1~5共5个文件夹
　　for /l %%i in (1,1,5) do rd /q %%i --删除从1~5共5个文件夹
```
## 四、参数 /F (使用文件解析来处理命令输出、字符串及文件内容。)

　　这个参数是最难的，参数又多，先简单的解释一下：for命令带这个参数可以分析文件内容，字符串内容或某一命令输出的结果，并通过设置option得我们想要的结果。

　　以下是某高手的解释，感觉有点太专业了，自认为不太容易理解，也列一下：

　　[
- 迭代及文件解析--使用文件解析来处理命令输出、字符串及文件内容。使用迭代变量定义要检查的内容或字符串，并使用各种options选项进一步修改解析方式。使用options令牌选项指定哪些令牌应该作为迭代变量传递。

- 请注意：在没有使用令牌选项时，/F 将只检查第一个令牌。文件解析过程包括读取输出、字符串或文件内容，将其分成独立的文本行以及再将每行解析成零个或更多个令牌。然后通过设置为令牌的迭代变量值，调用 for 循环。

- 默认情况下，/F 传递每个文件每一行的第一个空白分隔符号。跳过空行。
]

　　格式：
``` bash
　　FOR /F ["options"] %variable IN (file-set) DO command [command-parameters]
　　FOR /F ["options"] %variable IN ("string") DO command [command-parameters]
　　FOR /F ["options"] %variable IN ('command') DO command [command-parameters]
```
　　或者，如果有 usebackq 选项:
``` bash
　　FOR /F ["options"] %variable IN (file-set) DO command [command-parameters]
　　FOR /F ["options"] %variable IN ("string") DO command [command-parameters]
　　FOR /F ["options"] %variable IN ('command') DO command [command-parameters]
```
　　TTT说明：以上是WinXP系统中的帮助内容，你可以注意到，两者完全相同，这其实是系统的错误，第二段“如果有 usebackq 选项:”应该以下的内容：
``` bash
　　FOR /F ["options"] %variable IN ("file-set") DO command [command-parameters]
　　FOR /F ["options"] %variable IN ('string') DO command [command-parameters]
　　FOR /F ["options"] %variable IN (`command`) DO command [command-parameters] --(`command`中的引号为反引号，是键盘上数字1左面的那个键)
```
　　(TTT说明：下面是详细的解释，大部分是系统中的帮助内容，也有些错误(怪不得for命令这么难学)，已经被我纠正了。)

1. OPTION关键字详解:

- eol=c：指一个行注释字符的结尾(就一个)。例如：eol=; --忽略以分号打头的那些行;

- skip=n：指在文件开始时忽略的行数。例如：skip=2 --忽略2行

- delims=xxx：指分隔符集。这个替换了空格和跳格键的默认分隔符集。例如：[delims=, ] --指定用逗号，空格对字符串进行分隔。

- tokens=x,y,m-n：指每行的哪一个符号被传递到每个迭代的 for 本身。这会导致额外变量名称的分配。m-n格式为一个范围。通过 nth 符号指定 mth。如果符号字符串中的最后一个字符是星号，那么额外的变量将在最后一个符号解析之后分配并接受行的保留文本。例如：tokens=2,3* --将每行中的第二个和第三个符号传递给 for 程序体；tokens=2,3* ... i% --将会把取到的第二个字符串赋给i%,第三个赋给j%,剩下的赋给k%。

### 关于usebackq,不同版本的系统提示不同的帮助，不过都有助于理解，所以都摘抄如下：
- (1). usebackq：使用后引号（键盘上数字1左面的那个键`）。未使用参数usebackq时：file-set表示文件，不能加引号，所以不能含有空格；加双引号表示字符串，即"string"；加单引号表示执行命令，即'command'。使用参数usebackq时：file-set和"file-set"都表示文件，当文件路径或名称中有空格时，就可以用双引号括起来；单引号表示字符串，即'string'；后引号表示命令执行，即`command`。(此段是WinXP系统中的帮助)

- (2). usebackq：指定新语法已在下类情况中使用：在作为命令执行一个后引号的字符串；并且一个单引号字符为文字字符串命令；并允许在filenameset中使用双引号扩起文件名称。

　　以上两条结合着看，其实已经可以明白了，我再说明一下：

> 其实这个参数的目的就是为了处理带有空格的文件名。如果您要处理的文件名和路径中含有空格，如果直接使用，会提示找不到文件。如果你用双引号将文件名和路径括起来。这时候将作为字符串处理，而不是作为文件了。为了应对这种情况，所以才增加了这个“usebackq”参数。如果使用了这个参数，对于括号中的加双引号的集合，系统就可以认为是文件了；真正的字符串要加单引号；命令要加反引号。

2. file-set 为一个或多个文件名。继续到 file-set 中的下一个文件之前，每份文件都已被打开、读取并经过处理。处理包括读取文件，将其分成一行行的文字，然后将每行解析成零或更多的符号。然后用已找到的符号字符串变量值调用 For 循环。以默认方式，/F 通过每个文件的每一行中分开的第一个空白符号。跳过空白行。您可通过指定可选 "options"参数替代默认解析操作。这个带引号的字符串包括一个或多个指定不同解析选项的关键字。

3. %i：专门在 for 语句中得到说明，%j 和 %k 是通过tokens= 选项专门得到说明的。您可以通过 tokens= 一行指定最多 26 个符号，只要不试图说明一个高于字母 'z' 或'Z' 的变量。请记住，FOR 变量是单一字母、分大小写和全局的；而且，同时不能有 52 个以上都在使用中。

TTT补充说明：

一般在`tokens`后只指定第一个参数，如`%%i`或`%%a`，在后面使用第二个及两个以上的参数，自动按顺序往下排即可。

如前面指定的是`%%a`，后面则用`%%b`代表第二个结果，`%%c`代表第 三个结果。。。测试了一下`tokens`后指定多个变量名，没有测试成功，应该是不可以的。所以`token`后只能跟要使用的第一个变量名

如果使用的变量名超过了`%z`或`%Z`，就无法使用了，曾经以为会循环过来：如`%%z`后可以使用`%%a`或`%%A`，但经测试，这是不可以的。

　　如：
```bash
for /f "tokens=1,2,3* delims=-, " %%y in ("aa bb,cc-dd ee") do echo %%y %%z %%A %%a #只会输出前两个字符串，后面的两个变量是无效的
```

　　以下是系统提供的范例：
```bash
　　FOR /F "eol=; tokens=2,3* delims=, " %i in (myfile.txt) do @echo %i %j %k --
```

　　说明：会分析 myfile.txt 中的每一行，

- `eol=;` --忽略以分号打头的那些行;
- `tokens=2,3*` --将每行中的第二个和第三个符号传递给 for 程序体；
- `delims= ,` --用逗号和/或空格定界符号。
- `%i` --这个 for 程序体的语句引用 %i 来取得取得的首个字符串(本例中为第二个符号)，引用 %j 来取得第二个字符串(本例中为第三个符号)引用 %k来取得第三个符号后的所有剩余符号。

　　(TTT说明：上述例子和说明中明显的错误，%i应该换为%%i(帮助中有明确的说明：指定变量请使用 %%variable,而不要用 %variable，误导)

- TTT:下面列我做的几个例子：
1. 分析文件的例子

``` bash
　　FOR /F "eol=; tokens=1,2* delims=,- " %%i in (d:/test.txt) do echo %%i %%j %%k
```

2. 分析字符串的例子：

``` bash
　　for /f "tokens=1,2,3* delims=-, " %%i in ("aa bb,cc-dd ee") do echo %%i %%j %%k %%l
```
3. 分析命令输出的例子：

``` bash
　　FOR /F "tokens=1* delims==" %%i IN ('set') DO @echo [%%i----%%j]
```
- 如果使用了usebackq参数后，命令如下，结果与上面的完全相同。
1. 分析文件的例子

``` bash
　　FOR /F "usebackq eol=; tokens=1,2* delims=,- " %%i in ("d:/test.txt") do echo %%i %%j %%k
```

2. 分析字符串的例子：

``` bash
　　for /f "usebackq tokens=1,2,3* delims=-, " %%i in ('aa bb,cc-dd ee') do echo %%i %%j %%k %%l
```
3. 分析命令输出的例子：(会枚举当前环境中的环境变量名称和值。)

``` bash
　　FOR /F "usebackq tokens=1* delims==" %%i IN (`set`) DO @echo [%%i----%%j]
```
　　结果大家可以试一下，很容易就明白的。
## FOR命令中的变量 

　　FOR 变量参照的替换已被增强。您现在可以使用下列选项语法:
- ~I         - 删除任何引号(")，扩充 %I
- %~fI        - 将 %I 扩充到一个完全合格的路径名
- %~dI        - 仅将 %I 扩充到一个驱动器号
- %~pI        - 仅将 %I 扩充到一个路径
- %~nI        - 仅将 %I 扩充到一个文件名
- %~xI        - 仅将 %I 扩充到一个文件扩展名
- %~sI        - 扩充的路径只含有短名
- %~aI        - 将 %I 扩充到文件的文件属性
- %~tI        - 将 %I 扩充到文件的日期/时间
- %~zI        - 将 %I 扩充到文件的大小
- %~$PATH:I   - 查找列在路径环境变量的目录(TTT提示：是环境变量path的目录)，并将 %I 扩充到找到的第一个完全合格的名称。如果环境变量名未被定义，或者没有找到文件，此组合键会扩充到空字符串
　　此外，还可以组合修饰符来得到多重结果:
- %~dpI       - 仅将 %I 扩充到一个驱动器号和路径
- %~nxI       - 仅将 %I 扩充到一个文件名和扩展名
- %~fsI       - 仅将 %I 扩充到一个带有短名的完整路径名
- %~dp$PATH:i - 查找列在路径环境变量的目录，并将 %I 扩充到找到的第一个驱动器号和路径。 
- %~ftzaI     - 将 %I 扩充到类似输出线路的 DIR
　　在以上例子中，%I 和 PATH 可用其他有效数值代替。%~ 语法用一个有效的 FOR 变量名终止。选取类似 %I 的大写变量名比较易读，而且避免与不分大小写的组合键混淆。

# (以上是系统帮助的内容)
　　我们可以看到每行都有一个大写字母"I",这个I其实就是我们在FOR带入的变量,例如：

``` bash
　　FOR /F "usebackq eol=; tokens=1,2* delims=,- " %%x in ("d:/test.txt") do echo %%x %%y %%z
```
　　这里我们就要把那个 `x,y,z` 改成 `%~fx,%~fy,%~fz`。


TTT特例：以下是我根据以上说明作的一个综合的例子，可以直接复制到记事本里，保存为bat格式(c盘下任一目录)，运行后，可以直观的看到扩展后的效果。

``` bash
　　@echo off
　　echo ---显示"dir c:/boot.ini /b /ah"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "不扩展变量" %%i
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~fI %%~fi --"扩充到一个完全合格的路径名"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~dI %%~di --"仅将变量扩充到一个驱动器号"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~pI %%~pi --"仅将变量扩充到一个路径"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~nI %%~ni --"仅将变量扩充到一个文件名"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~xI %%~xi --"仅将变量扩充到一个文件扩展名"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~sI %%~si --"扩充的路径只含有短名"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~aI %%~ai --"将变量扩充到文件的文件属性"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~tI %%~ti --"将变量扩充到文件的日期/时间"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~zI %%~zi --"将变量扩充到文件的大小"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~$PATH:I %%~$PATH:i --"查找列在路径环境变量的目录，并将变量扩充到找到的第一个完全合格的名称"
　　echo ---以下显示组合修饰符来得到多重结果---：
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~dpI %%~dpi --"仅将变量扩充到一个驱动器号和路径"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~nxI %%~nxi --"仅将变量扩充到一个文件名和扩展名"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~fsI %%~fsI --"仅将变量扩充到一个带有短名的完整路径名"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~dp$PATH:I %%~dp$PATH:i --"查找列在路径环境变量的目录，并将变量扩充到找到的第一个驱动器号和路径"
　　for /f "delims==" %%i in ('dir c:/boot.ini /b /ah') do echo "扩展变量到"~ftzaI %%~ftzai --"将变量扩充到类似输出线路的DIR"
　　echo.
　　echo ---显示"dir C:/WINDOWS/system32/notepad.exe /b"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "不扩展变量" %%i
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~fI %%~fi --"扩充到一个完全合格的路径名"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~dI %%~di --"仅将变量扩充到一个驱动器号"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~pI %%~pi --"仅将变量扩充到一个路径"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~nI %%~ni --"仅将变量扩充到一个文件名"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~xI %%~xi --"仅将变量扩充到一个文件扩展名"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~sI %%~si --"扩充的路径只含有短名"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~aI %%~ai --"将变量扩充到文件的文件属性"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~tI %%~ti --"将变量扩充到文件的日期/时间"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~zI %%~zi --"将变量扩充到文件的大小"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~$PATH:I %%~$PATH:i --"查找列在路径环境变量的目录，并将变量扩充到找到的第一个完全合格的名称"
　　echo ---以下显示组合修饰符来得到多重结果---：
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~dpI %%~dpi --"仅将变量扩充到一个驱动器号和路径"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~nxI %%~nxi --"仅将变量扩充到一个文件名和扩展名"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~fsI %%~fsI --"仅将变量扩充到一个带有短名的完整路径名"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~dp$PATH:I %%~dp$PATH:i --"查找列在路径环境变量的目录，并将变量扩充到找到的第一个驱动器号和路径"
　　for /f "delims==" %%i in ('dir C:/WINDOWS/system32/notepad.exe /b') do echo "扩展变量到"~ftzaI %%~ftzai --"将变量扩充到类似输出线路的DIR"
　　Pause
```

## TTT说明：
1. 以上命令中，%%~fsI无法显示，估计是系统错误，因为%%~fI是扩充到一个完全合格的路径名，%%~sI只含有短文件名，本身是相互矛盾的，所以出错。不知是系统的错误还是在考我们~~
2. 以上命令如果保存在别的盘中，无法显示正确的驱动器和路径。
3. 如果想要%%~dp$PATH:i正常显示，要保证环境变量path中确实有这个路径：C:/WINDOWS/system32。
# 下面依次说明一下：
## 一、 ~I       - 删除任何引号(")，扩展 %I

　　这个变量的作用就如他的说明,删除引号!
　　删除引号规则如下(BAT兄补充!)：
- 1、若字符串首尾同时存在引号，则删除首尾的引号；
- 2、若字符串尾不存在引号，则删除字符串首的引号；
- 3、如果字符串中间存在引号，或者只在尾部存在引号，则不删除。
　　龙卷风补充：无头不删，有头连尾删。

　　我们来看这个例子，首先建立临时文件temp.txt，内容如下
``` bash
　　"1111
　　"2222"
　　3333"
　　"4444"44
　　"55"55"55
```
　　也可建立个BAT文件代码如下:
``` bash
　　@echo off
　　echo ^"1111>temp.txt
　　echo "2222">>temp.txt
　　echo 3333^">>temp.txt
　　echo "4444"44>>temp.txt
　　echo ^"55"55"55>>temp.txt
　　rem 上面建立临时文件，注意不成对的引号要加转义字符^，重定向符号前不要留空格
　　FOR /F "delims=" %%i IN (temp.txt) DO echo   %%~i
　　pause
　　del temp.txt

　　执行后,我们看CMD的回显如下:
　　1111        #字符串前的引号被删除了
　　2222        #字符串首尾的引号都被删除了
　　3333"       #字符串前无引号，后面的引号保留
　　4444"44     #字符串前面的引号删除了，而中间的引号保留
　　55"55"55    #字符串前面的引号删除了，而中间的引号保留
　　请按任意键继续. . .
```
　　结果和之前temp.txt中的内容对比一下,我们会发现第1、2、5行的引号都消失了,这就是删除引号~i的作用了!

## 二、 %~fI        - 将 %I 扩展到一个完全合格的路径名
　　示例:
　　把代码保存放在随便哪个地方,我这里就放桌面吧.
```bash
　　FOR /F "delims==" %%i IN ('dir /b') DO @echo   %%~fi
　　pause
```
　　执行后显示内容如下
```bash
　　C:/Documents and Settings/Administrator/桌面/test.bat
　　C:/Documents and Settings/Administrator/桌面/test.vbs
```
　　当我把代码中的 %%~fi直接改成%%i
```bash
　　FOR /F "delims==" %%i IN ('dir /b') DO @echo   %%i
　　pause
```
　　执行后就会显示以下内容：
```bash
　　test.bat
　　test.vbs
```
　　通过对比,我们很容易就看出没有路径了,这就是"将 %I 扩展到一个完全合格的路径名"的作用，也就是如果%i变量的内容是一个文件名的话,他就会把这个文件所在的绝对路径打印出来,而不只单单打印一个文件名,自己动手动实验下就知道了!

## 三、 %~dI        - 仅将 %I 扩展到一个驱动器号
　　看例子:
　　代码如下,我还是放到桌面执行!
```bash
　　FOR /F "delims==" %%i IN ('dir /b') DO @echo   %%~di
　　pause
```
　　执行后我CMD里显示如下
```bash
　　C:
　　C:
```
　　我桌面就两个文件test.bat,test.vbs,%%~di作用是,如果变量%%i的内容是一个文件或者目录名,他就会把他这文件或者目录所在的盘符号打印出来!

## 四、 %~pI        - 仅将 %I 扩展到一个路径
　　这个用法和上面一样,他只打印路径不打印文件名字
```bash
　　FOR /F "delims==" %%i IN ('dir /b') DO @echo   %%~pi
　　pause
```
　　我就不打结果了,大家自己复制代码看结果吧,下面几个都是这么个用法,代码给出来,大家自己看结果吧!

## 五、 %~nI        - 仅将 %I 扩展到一个文件名
　　只打印文件名字
```bash
　　FOR /F "delims==" %%i IN ('dir /b') DO @echo   %%~ni
　　pause
```
## 六、 %~xI        - 仅将 %I 扩展到一个文件扩展名
　　只打印文件的扩展名
```bash
　　FOR /F "delims==" %%i IN ('dir /b') DO @echo   %%~xi
　　pause
```
## 七、 %~sI        - 扩展的路径只含有短名
　　打印绝对短文件名
```bash
　　FOR /F "delims==" %%i IN ('dir /b') DO @echo   %%~si
　　pause
```
## 八、 %~aI        - 将 %I 扩展到文件的文件属性
　　打印文件的属性
```bash
　　FOR /F "delims==" %%i IN ('dir /b') DO @echo   %%~ai
　　pause
```
## 九、 %~tI        - 将 %I 扩展到文件的日期/时间
　　打印文件建立的日期
```bash
　　FOR /F "delims==" %%i IN ('dir /b') DO @echo   %%~ti
　　pause
```
## 十、 %~zI        - 将 %I 扩展到文件的大小
　　打印文件的大小
```bash
　　FOR /F "delims==" %%i IN ('dir /b') DO @echo   %%~zi
　　pause
```
　　龙卷风补充：上面例子中的"delims=="可以改为"delims="，即不要分隔符

## 十一、 %~$PATH:I - 查找列在路径环境变量的目录，并将 %I 扩展到找到的第一个完全合格的名称。如果环境变量名未被定义，或者没有找到文件，此组合键会扩展到空字符串
　　这是最后一个,和上面那些都不一样,我单独说说!
　　然后在把这些代码保存为批处理,放在桌面。
```bash
　　@echo off
　　FOR /F "delims=" %%i IN (“notepad.exe”) DO echo   %%~$PATH:i
　　pause
```
　　龙卷风补充：上面代码显示结果为`C:/WINDOWS/system32/notepad.exe`

　　他的意思就在PATH变量里指定的路径里搜索notepad.exe文件，如果有notepad.exe则会把他所在绝对路径打印出来，没有就打印一个错误！

　　(TTT说明，保存到桌面上，运行显示结果为：系统找不到文件 “notepad.exe”。查看环境变量path中确实有这个路径，不明原因!后来发现了，原来是中文引号的原因。

　　上面的命令应该写成：
```bash
　　FOR /F "delims=" %%i IN ("notepad.exe") DO echo   %%~$PATH:i 
　　)
```
　　　最后发一个用批处理做一五子棋游戏:
```bash
@echo off&setlocal enabledelayedexpansion
mode con: lines=43 cols=110
set li39=    Ａ Ｂ Ｃ Ｄ Ｅ Ｆ Ｇ Ｈ Ｉ Ｊ Ｋ Ｌ Ｍ Ｎ Ｏ Ｐ Ｑ Ｒ Ｓ
set li0= ┌─────────────────────────────────────┐
set li1=Ａ│┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐│Ａ
set var=1
for %%a in (!li39:~5^,-1!) do (set/a var+=2&set li!var!=%%a│├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤│%%a)
for /l %%a in (2,2,36) do (set li%%a= ││ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ ││)
set li37=Ｓ│└─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘│Ｓ
set li38= └─────────────────────────────────────┘
set str=a b c d e f g h i j k l m n o p q r s
for %%a in (%str%) do (set/a .+=1,%%a=.&set z!.!=%%a)
set li5=!li5!   五 棋 子 人 机 对 战
set li7=!li7!        批 处 理
set li10=!li10!      电 脑 水 平 中 等
set li31=!li31! 由 netbenton 编写完成
set li33=!li33! 棋盘设计参照了 batman
title   批处理五子棋

set str=###################
set .=0
for /l %%a in (1,1,19) do (
        set he%%a=!str!&set sh%%a=!str!
        for /l %%b in (1,1,19) do set [%%a.%%b=0
)
set .=33
for /l %%a in (5,1,19) do (
        set pi%%a=!str:~,%%a!&set ni%%a=!str:~,%%a!
        set pi!.!=!str:~,%%a!&set ni!.!=!str:~,%%a!
        set/a .-=1
)

set ●=○&set ○=●
set zhi=●
set say=say
::设置电脑IQ
set idea=@@@@#.1 #@@@@.5 @#@@@.4 @@@#@.2 @@#@@.3 vs0

 
#.1 #
 
.5
#
.3 $#
$.4
$#$.2 vs1 #@@@##.2 ##@@@#.5 #@@#@#.3 #@#@@#.4 vs2 #@##@@#.4-5 #@@##@#.4-3 #@#@@.3-5 @#@@#.4-1 #@@@##.2-W-1 ##@@@#.5-W-6 vs3
set idea=!idea! ##@@@.4-W-5 @@@##.2-W-1 @##@@#.4-5 #@##@@.3-4 #@#@#@.4-2 @#@#@#.3-5 vs4 #
#$#.3-W-6-1 #$#
#.4-W-1-6 ##
$#.5-W-1-6 #
$##.2-W-1-6 vs5 ##@@##.2-5-W-6-1 #@#@#.3-w-1-5 ##
$.W−4−5
$##.W-2-1
##$.W-2-3 $##
.W-3-4 $#
#.W-4-1 $#$#$.W-4-2 #
#$.W-2-5 ##
#.W-4-W-1-5 #
##.W-2-W-1-5 #$#$#.W-3-W-1-5 #$##$#.W-3-4
set idea=!idea! vs7 #$$$#.1-5 @@###.4-3 ###@@.3-4 ###@###.3-5-W-2-6-W-1-7 vs8 ###$###.3-5 vs9 @####.4 ####@.2 #$###.3 ###$#.3
set idea=!idea! ###@#.3 #@###.3 $####.3 ####$.3
###.3 ###
.3 $#$##.2 ##$#$.4 #$##$.3 $##$#.3 $###$.3 vs10
set iqam=1000000000
:restart
(
setlocal enabledelayedexpansion
for /l %%a in (0,1,39) do (echo    !li%%a!)
set li39=!li39!   reboot重新开始,exit退出。
set li37=!li37!       back 悔棋
set /p var=选择谁先下[ W,玩家 D,电脑 Q,退出 ]:
if /i "!var!" equ "Q" goto :quit
if /i "!var!" equ "D" (set onez=○&set towz=●&set hou=☆) else (set onez=●&set towz=○&set hou=★)
set a!onez!=电脑&set a!towz!=玩家
)
(
set ttr=!idea=%onez%!&set ttr=!ttr=%towz%!
set idea=
for %%a in (!ttr!) do (
        for /f "tokens=1,2 delims=." %%b in ("%%a") do (set %%b=%%c&set idea=!idea! %%b)
)
set ttr=
set li27=!li27!    !onez! !a%onez%!
set li25=!li25!    !towz! !a%towz%!
set/a pos=10,poh=10&goto :getok
)
:loop
(if %zhi% equ %onez% goto :men
set .=
setlocal enabledelayedexpansion
for %%a in (!idea!) do (
        set str=%%a
        if "!str:~,2!" neq "vs" (
        for %%b in (he sh) do (
                set all=!%%b1!!%%b2!!%%b3!!%%b4!!%%b5!!%%b6!!%%b7!!%%b8!!%%b9!!%%b10!!%%b11!!%%b12!!%%b13!!%%b14!!%%b15!!%%b16!!%%b17!!%%b18!!%%b19!
                if "!all:%%a=!" neq "!all!" (
                        for /l %%c in (1,1,19) do (
                                if "!%%b%%c:%%a=!" neq "!%%b%%c!" set/a .+=1&set put!.!=%%b %%c.%%a.!iqam!
                        )
        )        )
        for %%b in (pi ni) do (
                set all=!%%b5!!%%b6!!%%b7!!%%b8!!%%b9!!%%b10!!%%b11!!%%b12!!%%b13!!%%b14!!%%b15!!%%b16!!%%b17!!%%b18!!%%b19!!%%b20!!%%b21!!%%b22!!%%b23!!%%b24!!%%b25!!%%b26!!%%b27!!%%b28!!%%b29!!%%b30!!%%b31!!%%b32!!%%b33!
                if "!all:%%a=!" neq "!all!" (
                        for /l %%c in (5,1,33) do (
                                if "!%%b%%c:%%a=!" neq "!%%b%%c!" set/a .+=1&set put!.!=%%b %%c.%%a.!iqam!
                        )
        )        )
        ) else (
                set/a "iqam=(iqam+1)/8"
                if %%a equ vs8 if defined . goto :get
                if %%a equ vs9 if defined . goto :get
                
                
        )
))
if defined . (goto :get)
echo. 已经和棋了 
pause
endlocal&goto :restart
:men
(
set/a .=lips-1&for /f "tokens=1-3" %%b in ("li!liph! !lips! !.!") do (set %%b=!%%b:~0,%%d!%hou%!%%b:~%%c!)
set li38=!li38![%悔:~,24%]
cls
for /l %%a in (0,1,39) do (echo    !li%%a!)
for /f "tokens=1-3" %%b in ("li!liph! !lips! !.!") do (set %%b=!%%b:~0,%%d!%zhi%!%%b:~%%c!)
set li38=%li38%
set /p user=!say:say=%error%! [列前，行后]: 
if "!user!" equ "reboot" endlocal&goto :restart
if "!user!" equ "exit" goto :quit
if "!user!" equ "back" call :悔&goto :men
set/a pos=!user:~0,1!,poh=!user:~1,2!,var=pos-1 2>nul
if not defined [!poh!.!pos! set error=输入点不存在 &goto :men
)
if "!he%poh%:~%var%,1!" neq "#" set error=该点已经有子 &goto men
goto :getok
:get
set `=
::取最佳的走法
for /l %%z in (!.!,-1,1) do (
for /f "tokens=1,2,3 delims=." %%1 in ("!put%%z!") do (
for /f "tokens=1-4" %%a in ("%%1 %%2") do (
        set iqm=%%3
        set vara=!%%a%%b:*%%c=!srqponmlkjihgfedcba0
        for %%4 in (!%%2:-^=;!) do (
          if "%%4" equ "W" (set/a iqm=iqm/5*3) else (
                set/a var=!vara:~19,1!+%%4
                if "%%a" equ "he" (set/a poh=%%b,pos=20-var)
                if "%%a" equ "sh" (set/a poh=20-var,pos=%%b)
                if %%b lss 19 (set/a var=%%b-var+1) else (set/a var=38-%%b-var+1)
                if "%%a" equ "pi" (if %%b lss 19 (set/a pos=var,poh=%%b-var+1) else (set/a poh=20-var,pos=%%b-19+var))
                if "%%a" equ "ni" (if %%b lss 19 (set/a pos=var,poh=19-%%b+var) else (set/a poh=var,pos=%%b-19+var))
                if not defined R!pos!R!poh!R set /a `+=1&set ram!`!=R!pos!R!poh!R
                set/a R!pos!R!poh!R+=iqm
          )
        )
)
)
)
set rmk=0
for /l %%a in (1,1,!`!) do (
        for %%b in (!ram%%a!) do (
                for %%c in (!%%b!) do (
                        if %%c gtr !rmk! set/a rmk=%%c,.=0
                        if %%c equ !rmk! set rmz!.!=%%b&set/a .+=1
                )
)        )
set/a .=!random!%%.
for /f "tokens=1,2 delims=R" %%a in ("!rmz%.%!") do (set/a pos=%%a,poh=%%b)
 

rem start set r^&echo !.!^&pause^&exit

endlocal&set/a pos=%pos%,poh=%poh%
set say=say !z%pos%!!z%poh%!(%poh%)&set error=电脑最后下在：
:getok
set zhi=!%zhi%!&set win=!zhi!!zhi!!zhi!!zhi!!zhi!
(set/a piph=poh+pos-1,lips=pos*2+1,niph=19+pos-poh,liph=poh*2-1
if !piph! lss 19 (set/a pips=pos) else (set/a pips=20-poh)
if !niph! lss 19 (set/a nips=pos) else (set/a nips=poh)
for %%a in ("li!liph! !lips!" "he!poh! !pos!" "sh!pos! !poh!" "pi!piph! !pips!" "ni!niph! !nips!") do (
        for /f "tokens=1,2" %%b in (%%a) do (
                set/a .=%%c-1
                for %%d in (!.!) do (set %%b=!%%b:~0,%%d!%zhi%!%%b:~%%c!)
                if "!%%b:%win%=!" neq "!%%b!" set win=y
        )
))
(set/a asc%zhi%+=1
set 悔= !z%pos%!!z%poh%!!悔!
if !win! neq y goto :loop)
for /l %%a in (0,1,39) do (echo    !li%%a!)
set/p=    !a%zhi%! %zhi%子 第!asc%zhi%!手 !z%pos%!!z%poh%!(%poh%) 胜出    <nul
pause
endlocal&goto :restart
:悔
if not defined 悔 goto :eof
if "!悔:~6,1!" equ "" goto :eof
for %%a in (!悔:~^,6!) do (set str=%%a
set/a poh=!str:~-1!,pos=!str:~,1!
set/a piph=poh+pos-1,niph=19+pos-poh,liph=poh*2-1,lips=pos*2+1
if !piph! lss 19 (set/a pips=pos) else (set/a pips=20-poh)
if !niph! lss 19 (set/a nips=pos) else (set/a nips=poh)
for %%a in ( "he!poh! !pos!" "sh!pos! !poh!" "pi!piph! !pips!" "ni!niph! !nips!") do (
        for /f "tokens=1,2" %%b in (%%a) do (
                        set/a .=%%c-1
                        for %%d in (!.!) do (set %%b=!%%b:~0,%%d!#!%%b:~%%c!)
        )
)
for /f "tokens=1,2" %%b in ("li!liph! !lips!") do (
        set/a .=%%c-1
        for %%d in (!.!) do (set %%b=!%%b:~0,%%d!┼!%%b:~%%c!)
))
set/a asc%zhi%-=1
set 悔=!悔:~6!
set error=你悔棋，耍赖皮！
if not defined 悔 goto :eof
set/a poh=!悔:~2,1!,pos=!悔:~1,1!,liph=poh*2-1,lips=pos*2+1
set say=say !z%pos%!!z%poh%!(%poh%)
goto :eof
:quit
taskkill /fi "WINDOWTITLE eq 批处理五子棋*" /im cmd.exe
```