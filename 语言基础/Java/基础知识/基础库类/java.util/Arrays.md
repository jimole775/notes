这个属于一个静态类，专门用于处理数组元素的

一般java声明数组：
int[] arr = new int[5]; //5个长度的int数组

- `Arrays.sort();` 在js中，这个是属于实例方法；在java中，则是静态方法

- `Arrays.toString({});`

- `Arrays.deepToString({{}});`

- `Arrays.fill(int[],0);` 全部填充成0；

- `Arrays.equals(int[] a,int[] b);` 比对两个数组是否相等

- `System.arraycopy(arr1,1,arr2,2,2);` 把数组arr1的2个数复制到arr2

- `var newArr = Arrays.copyOf(arr1,arr1.length)` 返回的结果是一个新的arr1，第二个参数是新数组的长度，如果长度超出了实际大小，后面的位置会被0，false，或者null来填充（视数据类型而定）

- `var newArr1 = Arrays.copyOf(arr1,0,5)` copy 0~4的元素