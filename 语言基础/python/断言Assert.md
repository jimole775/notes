### 正常情况下：
``` python
assert (1 == True)
```
assert可以当作关键字使用

### [unittest](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.assertRaises) 框架下：
需要在自定义类中注入unittest.TestCase
``` python
class Test(unittest.TestCase):
  def run(self):
    self.assertEqual(1,True)
pass
```
