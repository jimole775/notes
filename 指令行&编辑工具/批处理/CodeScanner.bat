@ECHO OFF&SETLOCAL ENABLEDELAYEDEXPANSION
ECHO Which folder do you wanna scanning?
ECHO You can press "Enter" to skip, then we will use default setting "./src".
ECHO Please keep that folder was exist.
SET /P path=:
IF %ERRORLEVEL% EQU 1 (
SET path=./src # 设置默认执行目录
)
DEL ScaningRecord.log
SET type=*.js #需要扫描的文件类型
SET codesum=0 #代码总数
SET typesum=2 #文件类型的总数，现阶段有2种，一种是 js 一种是 vue
SET spinfin=1 #加载动画起始帧，帧数到 3 6 9 12 时进行视图替换
SET spin=- #加载动画的视图
:LOOP #循环体命名
FOR /R %path% %%f IN (%type%) DO ( #循环path目录下的js类型的文件， /R为递归
	CLS
	IF !spinfin! EQU 3 SET spin=-
	IF !spinfin! EQU 6 SET spin=/
	IF !spinfin! EQU 9 SET spin=-
	IF !spinfin! EQU 12 SET spin=\
	ECHO !spin! Scanning... #输出加载动画
	ECHO %%f #f为文件名
	SET lines=0
	FOR /F "eol=/ tokens=*" %%l IN (%%f) DO ( #读取文件内的行数，用变量 lines 存储
		SET /A codesum+=1
		SET /A lines+=1
		SET /A spinfin+=1
		IF !spinfin! EQU 13 SET spinfin=1
	)
	@ECHO %%f -- !lines!>>ScaningRecord.log	
)
SET /A typesum-=1 
IF %typesum% GTR 0 (	
SET type=*.vue
GOTO LOOP #切换扫描类型后，重新进入循环体
)
CLS
ECHO Copyright By Rongxis.
ECHO Scanning Completed!
ECHO Code Lines Total: %codesum%
ECHO Scanned Result All Copy Into The File - "./ScaningRecord.log"
@ECHO Code Lines Total: %codesum%>>ScaningRecord.log
pause
:end
