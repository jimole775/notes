static属于类的私有变量，不会赋值给实例，但是可以被公共访问（它和private的区别就是private不可以被外部访问，但是会被继承给实例）

class Employee{
	static string company = "研华";
	private int saraly = "10000";
}

static相当于JS在构造函数里面设置了一个局部变量，统一存储一些公共信息