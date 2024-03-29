# Start
启动单独的 “命令提示符” 窗口来运行指定程序或命令。如果在没有参数的情况下使用，start 将打开第二个命令提示符窗口。 

# 语法
``` cmd
start ["title"] [/dPath] [/i] [/min] [/max] [{/separate | /shared}] [{/low | /normal | /high | /realtime | /abovenormal | belownormal}] [/wait] [/b] [FileName] [parameters]
```
# 参数 
- `"title"` 指定在“命令提示符”窗口标题栏中显示的标题。 
- `/dpatch` 指定启动目录。 
- `/i` 将 Cmd.exe 启动环境传送到新的“命令提示符”窗口。 
- `/min` 启动新的最小化窗口。 
- `/max` 启动新的最大化窗口。 
- `/separate` 在单独的内存空间启动 16 位程序。 
- `/shared` 在共享的内存空间启动 16 位程序。 
- `/low` 以空闲优先级启动应用程序。 
- `/normal` 以一般优先级启动应用程序。 
- `/high` 以高优先级启动应用程序。 
- `/realtime` 以实时优先级启动应用程序。 
- `/abovenormal` 以超出常规优先级的方式启动应用程序。 
- `/belownormal` 以低出常规优先级的方式启动应用程序。 
- `/wait` 启动应用程序，并等待其结束。 
- `/b` 启动应用程序时不必打开新的“命令提示符”窗口。除非应用程序启用 CTRL+C，否则将忽略 CTRL+C 操作。使用 CTRL+BREAK 中断应用程序。 
非执行文件只要将文件名作为命令键入，即可通过其文件关联运行该文件。有关使用 assoc 和 ftype 在命令脚本中创建这些关联的详细信息，请参阅“”。

在运行的命令的第一个标记为“CMD”字符串但不包括扩展名或路径限定符时，“CMD”将被 COMSPEC 变量的值取代。这样可以防止用户从当前目录选取 cmd。

当您运行 32 位图形用户界面 (GUI) 应用程序时，cmd 不会在返回到命令提示符之前等待应用程序退出。如果从命令脚本运行应用程序，则不会发生这种新情况。在运行的命令中第一个符号不包括扩展名的情况下，Cmd.exe 使用 PATHEXT 环境变量的值确定要查找的扩展名以及查找顺序。PATHEXT 变量的默认值为：COM;.EXE;.BAT;.CMD（语法与 PATH 变量相同，使用分号分开不同元素）。当您搜索可执行文件且在任何扩展名上都没有匹配项时，start 将搜索目录名。

# 具体例子： 

说明：如果你所在程序的路径中带有空格，那么必须用“”把路径括起来，否则系统会提示找不到XX文件，另外，在运行某些程序时，需在路径的前面加一对空白的“”，表示创建一个空白的窗口，它指向的程序是XXXXXXXX。还有就是别忘了空格。 

``` cmd
rem 表示以常规窗口运行程序 
start "D:/draw/photoshop.exe"

rem 表示以最大化窗口运行程序 
start /max "D:/draw/photoshop.exe"

rem  表示以最小化窗口运行程序
start /min "D:/draw/photoshop.exe"

rem 等待某个程序允许完毕，也就是窗口关闭后，再打开下一个程序这可以这样： 
start /w "D:/draw/photoshop.exe" 
start cmd.exe
```