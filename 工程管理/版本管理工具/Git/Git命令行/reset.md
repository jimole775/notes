## 概述
reset主要的行为就是重新指定HEAD的位置到某个版本

### 首先需要理解几个概念
1. 工作区：所有未暂存的改动，都是存在工作区的
2. 暂存区：git add之后，就会存入暂存区
3. 本地仓库：git commit之后，就会存入本地仓库
4. 远程仓库：git push之后，推送到远程仓库

## reset有3种类型

### 1. git reset --soft [hash]
保留工作目录，并把重置 HEAD 所带来的新的差异放进暂存区

### 2. git reset --mixed [hash]
把所有差异都混合（mixed）放在工作目录中

### 3. git reset --hard [hash]
重新指定HEAD之后，HEAD后面的所有版本信息都会丢掉，包括暂存区的