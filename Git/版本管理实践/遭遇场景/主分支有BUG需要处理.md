开发分支开发到一半，突然主分支有紧急BUG需要处理：
1. 使用 ```git stash``` **暂存** 当前分支的修改
2. 使用 ```git branch masterBug master``` ，从主分支 **分离** 出一个masterBug分支，并且HEAD也指到该分支。
3. 使用 ```git checkout masterBug``` ，切换到masterBug，处理BUG
4. 修改完毕后，切换到主分支，使用 ```git merger masterBug ```，合并分支
5. 使用 ```git branch -D masterBug``` ，删除masterBug
