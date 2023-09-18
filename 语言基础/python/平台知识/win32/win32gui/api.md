# FindWindow
根据窗口标题（text类型）来查询当前窗口的句柄（唯一数字编号），并不是所有窗口都有 窗口标题

## 样例
``` py
import win32gui
win32gui.FindWindow(Node, 'modal')
```

# EnumWindows
枚举所有活动窗口，并返回窗口的句柄

## 样例
``` py
import win32gui
def winEnumHandler(hwnd, ctx):
    if win32gui.IsWindowVisible(hwnd):
        print(hex(hwnd, win32gui.GetWindowText(hwnd)))

win32gui.EnumWindows(winEnumHandler, None)
```

# GetForegroundWindow
查找当前的激活窗口

# SetForegroundWindow
设置窗口前置
``` py
import win32gui, win32con
win = win32gui.FindWindow(None, 'xxx')
win32gui.SetForeggroundWindow(win)
win32gui.ShowWindow(win, win32con.SW_SHOW) # 前置之后，再SHOW一次，保证窗口能顺利激活
```

# GetWindowRect
返回窗口的坐标信息

# GetWindowText
根据 **窗口句柄** 返回 **窗口标题**
