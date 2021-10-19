from tkinter import *
from tkinter import messagebox
main = Tk()
main.title("OPR")
main.geometry("200x30")

ico_record = PhotoImage(file='assets/record.png')
ico_play = PhotoImage(file='assets/play.png')
ico_edit = PhotoImage(file='assets/edit.png')
ico_config = PhotoImage(file='assets/config.png')
def helloCallBack():
   messagebox.showinfo("Hello Python", "asdasd")

b_record = Button(main, text = "录制", command = helloCallBack)
b_play = Button(main, text = "播放", command = helloCallBack)
b_edit = Button(main, text = "编辑", command = helloCallBack)
b_config = Button(main, text = "配置", command = helloCallBack)
# 1，录制项目；2，播放项目；3，编辑项目；4，配置快捷键；5，退出
b_play['image'] = ico_play
b_edit['image'] = ico_edit
b_record['image'] = ico_record
b_config['image'] = ico_config
b_record.grid(row=0, column=0)
b_play.grid(row=0, column=1)
b_edit.grid(row=0, column=2)
b_config.grid(row=0, column=3, sticky='E')
## 录制
"【弹窗】"
"项目名："
"存放路径："

## 播放
"【弹窗】"
"选择资源"

## 编辑

## 快捷键
"【弹窗】"
"录制=>开始，暂停，结束..."
"播放=>开始，暂停，结束..."

## 退出
main.mainloop()