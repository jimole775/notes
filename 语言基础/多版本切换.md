# windows

## 安装
### 1. 拉取源码
git clone https://github.com/pyenv-win/pyenv-win.git --target C:\Users\<my_pc>\.pyenv


### 2. 新建环境变量
PYENV	C:\Users\<my_pc>\.pyenv\pyenv-win\
PYENV_HOME	C:\Users\<my_pc>\.pyenv\pyenv-win\
PYENV_ROOT	C:\Users\<my_pc>\.pyenv\pyenv-win\

### 2.1 PATH环境变量添加两个地址

C:\Users\<my_pc>\.pyenv\pyenv-win\bin
C:\Users\<my_pc>\.pyenv\pyenv-win\shims

## 使用
- 常用指令
1. pyenv install 3.12
2. pyenv local 3.12
3. pyenv global 3.12
