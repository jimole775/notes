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

