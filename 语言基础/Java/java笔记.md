1, 所有字串类型的单字符进行运算，都会转成ASC码；

2, int a = (int)1.9;   强制转换成整数； 
   字符串转换成浮点数 float num = Float.parseFloat("123")；

3, 不带引号的单个字母，用char转换时，都以16进制形式存在

4, 控制台内读取的数据全部为 string 类型

5, main方法的arg参数，接受的是命令行字段，参数之间用空格来分割
> java Hello -n -t
``` java
public class Hello {
  public static main(String arg[]) {
    if (arg[0].equals("-n")) {
      string name = "Andy";
    }
    if (arg[1].equals("-t")) {
      int time = new Date();
    }
    System.out.println("Hello" + name + time);
  }
}
```