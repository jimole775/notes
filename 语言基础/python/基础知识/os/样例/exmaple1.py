# 进行os操作时，操作读取指针的位移
path = './index.log'
file = open(path)
file.seek(10) # 指针跳到文本下标 10 处，注意区分 str类型 和 二进制类型
line = file.readline()
print(file.tell()) # 打印当前的指针位置
while len(line) > 0:
  line = file.readline()
  print(file.tell())