1. merge的时候，如果 test 分支的HEAD版本是 master 的后续，
   那么只能是在 master 分支上执行 merge 命令，
   否则会显示 already up-to-date ，因为在test分支上merge master，拿不到任何东西

例子: 
``` bash
$ git master merge test  # 正确
$ git test merge master	# already up-to-date
```
2. merge的时候，两个库的HEAD版本出现conflect，
   就必须先使用diff, 手动解决。


	
