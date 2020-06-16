# computed
computed应该和data进行比较，而不是watch，computed基本上和data类似，但是它提供一个getter和setter接口，比较灵活，一般如果直接在computed里面定义一个函数的话，那么这个对象最后返回给model的时候，是没有setter属性的，也就是只能取值，不能设置

# watch
1. 监听事件，也可以监听computed
