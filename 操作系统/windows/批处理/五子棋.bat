
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