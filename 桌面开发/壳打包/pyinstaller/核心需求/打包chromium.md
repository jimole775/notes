由于下载 chromium 需要翻墙的性质，所以在程序打包阶段，最好把 chromium 浏览器一并打包进安装程序

> 使用 nuitka 进行打包时，额外添加二进制文件是需要收费的，所以，改用 pyinstaller 比较实在，在这种情况下，就不能很好的支持 pywebview 了

1. 打包 chromium 时，我们需要先把 pyppeteer 对 chromium 的引用参数修改一下：
``` py
import sys
import os

def get_chromium_path():
    if getattr(sys, 'frozen', False):
        # 如果时打包后的可执行文件
        return os.path.join(sys._MEIPASS, 'chromium', 'chrome.exe')
    else:
        # 如果是在开发环境中运行
        return 'chrome-win32/chrome.exe' # 根据实际路径进行调整

# 执行这一步之前，我们先把 chromium 的直接复制到项目下的 chrome-win32/ 目录
browser = await launch(executablePath=get_chromium_path())
```

2. 打包指令中加入 `--add-binary "./chrome-win32;chromium"` 语句

比如：
``` shell
pyinstaller --add-binary "./chrome-win32;chromium" -i ico.png -D main.py
```
