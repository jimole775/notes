
1. 其实需要注意的是，java中的string不是基础类型，在对比的时候慎用 == 号，可以使用equals方法

2. 还有，每次拼接字符串时，不要使用 + 号，因为每次创建不同的字符串，都会新开内存，低效且增加消耗，可使用StringBuilder类，每次增加字符就类似于js使用数组来拼装字符串，最后join一下

3. 根据测试，每次使用 + 号未必都会新开内存，只有 `"a" + "b"` 这种直接字面量的运算才会新开内存，如果是 `a + "b"`,或者 `new String("a") + "b"` 都不会新开内存

4. String类也是final类，对象一旦生成，就不会改变，会放入内存池，让其他变量去引用，如果当前的内存池中没有这个字符串，就会被新建一个

5. `"" + (Object)a` 也可以直接转换 a 对象，其操作结果是 `"" + a.toString()`

- `char [StringObject].charAt(int index);`
返回给定位置的代码单元（unicode）

- `int [StringObject].codePointAt(int index);`
返回从给定位置开始或结束的代码点

- `int [StringObject].offsetByCodePoints(int startIndex, int cpCount)`
返回从startIndex代码点开始，位移cpCount后的代码点索引

- `int [StringObject].compareTo(String other)`
按照字典顺序，如果字符串位于other之前，返回一个负数；
如果字符串位于other之后，返回一个正数；
如果字符串相等，返回0.

- `boolean [StringObject].endsWith(String suffix)`
如果字符串以suffix结尾，返回true

- `boolean [StringObject].equals(Object other)`
如果字符串与other相等，返回true

- `boolean [StringObject].equalsIgnoreCase(String other)`
忽略大小写

- `int [StringObject].indexOf(String str)`
- `int [StringObject].indexOf(String str,int fromIndex)`
- `int [StringObject].indexOf(int cp)`
- `int [StringObject].indexOf(int cp,int fromIndex)`
返回指定字符串的下标, ...以下大致还有：length(),replace(),lastIndexOf(),trim()等等，基本和js都差不多了，也就不做记录了

- `char[] [StringObject].getBytes()`
- `char[] [StringObject].getBytes(Charset charset)`
返回字符串对应的unicode字节码序列
