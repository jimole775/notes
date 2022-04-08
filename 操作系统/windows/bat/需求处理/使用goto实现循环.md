``` cmd
START "" 1.exe :LOOP
GOTO :LOOP
```
循环执行 `1.exe` 程序，`:LOOP` 意义就是给第一行命令命名，然后使用`GOTO`可以运行指定的命令行