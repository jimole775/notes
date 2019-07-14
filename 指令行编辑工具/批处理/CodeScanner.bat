@ECHO OFF&SETLOCAL ENABLEDELAYEDEXPANSION
SET /P path=Which Folder Do You Wanna Scanning?(default:"./src"):
IF %ERRORLEVEL% EQU 1 (
SET path=./src
)
DEL count_record.log
SET type=*.js
SET codesum=0
SET typesum=2
SET spinfin=1
SET spin=-
:LOOP
FOR /R %path% %%f IN (%type%) DO (
	cls
	IF !spinfin! EQU 3 SET spin=-
	IF !spinfin! EQU 6 SET spin=/
	IF !spinfin! EQU 9 SET spin=-
	IF !spinfin! EQU 12 SET spin=\
	ECHO !spin! Scanning %%f
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
cls
ECHO Scanning Completed!
ECHO Code Lines Total: %codesum%
pause
:end