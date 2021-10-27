- `void [FieldObject].set(Object,new Object);` 设置新的域值

- `Object [FieldObject].get(Object);` 获取当前字段的域值

- `Class [FieldObject].getType();` 获取字段的Class对象

- `Modifier [FieldObject].getModifiers(Object);` 获取字段的Modifier对象，Modifier是个静态类，主要用于判断类型的

- `String [FieldObject].getName();` 获取字段名

一般Field对象由Class对象来获取，主要用于读取和设置字段的类型、信息；
就目前的阅读来说，Field只提供两个方法，set和get