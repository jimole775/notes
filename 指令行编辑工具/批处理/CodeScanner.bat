@ECHO OFF&SETLOCAL ENABLEDELAYEDEXPANSION
ECHO Which folder do you wanna scanning?
ECHO You can press "Enter" to skip, then we will use default setting "./src".
ECHO Please keep that folder was exist.
SET /P path=:
IF %ERRORLEVEL% EQU 1 (
SET path=./src
)
DEL ScaningRecord.log
SET type=*.js
SET codesum=0
SET typesum=2
SET spinfin=1
SET spin=-
:LOOP
FOR /R %path% %%f IN (%type%) DO (
	CLS
	IF !spinfin! EQU 3 SET spin=-
	IF !spinfin! EQU 6 SET spin=/
	IF !spinfin! EQU 9 SET spin=-
	IF !spinfin! EQU 12 SET spin=\
        ECHO Copyright By Rongxis.
	ECHO !spin! Scanning...
	ECHO %%f
	SET lines=0
	FOR /F "eol=/ tokens=*" %%l IN (%%f) DO (
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
GOTO LOOP
)
CLS
ECHO Copyright By Rongxis.
ECHO Scanning Completed!
ECHO Code Lines Total: %codesum%
ECHO Scanned Result All Copy Into The File - "./ScaningRecord.log"
@ECHO Code Lines Total: %codesum%>>ScaningRecord.log
pause
:end