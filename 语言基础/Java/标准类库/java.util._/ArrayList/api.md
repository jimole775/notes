- `[instance].add("asd")` 在末尾增加一个元素
- `[instance].set(index,"asd")` 修改指定位置的元素，如果元素未定义，将会报错
- `[instance].get(index)` 获取指定位置的元素
- `[instance].size()` 获取当前数组的实际长度
- `[instance].trimToSize()` 把当前数组空出来的容量给裁剪掉
- `[instance].ensureCapacity(int)` 重新确定数组容量
- `[instance].remove(index)` 删除指定位置元素
- `[instance].contains(index)` 删除指定位置元素


- 注意：
> java SE 5.0 以前没有泛型类，所以ArrayList统一返回Object类型，所以使用的时候必须进行转换
``` java
ArrayList stuff = new ArrayList(10);
stuff.add("asd");
String a = (String) stuff.get(0);
```
