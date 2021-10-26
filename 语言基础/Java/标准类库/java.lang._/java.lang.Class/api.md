- `Object [ClassObject].newInstance();`
构造一个对象

- `Constructor[] [ClassObject].getDeclaredConstructor();`
获取Constructor类型的所有构造器数组

- `Constructor [ClassObject].getDeclaredConstructor(String.class);`
获取带指定类型参数列表的构造器

- `Constructor [ClassObject].getDeclaredConstructor(String[]{String.class,String.class});`
获取带指定类型参数列表的构造器

- `Constructor[] [ClassObject].getConstructor();`
只能返回带有public关键字的构造函数

- `String [ClassObject].getName();`
返回class的名字

- `Class [ClassObject].getSuperClass();`
返回class的超类，如果没有定义继承的话，默认返回Object

- `Class [ClassObject].forName(String);`
根据String来访问已经构造的类

- `Field[] [ClassObject].getFields();`
获取类和超类的公有域

- `Field[] [ClassObject].getDeclaredFields();`
获取类的公有域

- `Class [ClassObject].getComponentType();`
获取类的公有域

- `Boolean [ClassObject].isPrimitive();`
此方法主要用来判断对象的类是否为基础类型（boolean、char、byte、short、int、long、float、double）。

- `Boolean [ClassObject].isArray();`
判断一个对象的类是否是数组类



