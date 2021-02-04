# computed
computed应该和data进行比较，而不是watch，computed基本上和data类似

但是它提供一个getter和setter接口，比较灵活，一般如果直接在computed里面定义一个函数的话，那么这个对象最后返回给model的时候，是没有setter属性的，也就是只能取值，不能设置（设置obj的属性除外）

# watch
watch就是劫持改造要监听的对象的set方法，在方法后面注入一个执行回调

也就是说一个对象调用了set方法之后，这个方法就会触发
