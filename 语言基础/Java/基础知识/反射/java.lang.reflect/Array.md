- `int Array.getLength(arrayObject)` 获取数组对象的长度
- `Class Array.newInstance(ComponentType,length)` 创建一个新数组,需要定义元素类型和长度，返回的是普通数组
- `Class Array.newInstance(ComponentType,int[] lengths)` 创建一个多维数组
- `Object Array.get(ArrayObject,index)` 返回指定位置的内容
- `void Array.set(ArrayObject,index,newValue)` 对指定位置设置新内容

普通数组类，通过 `int[] a = {}` 这种方式生产