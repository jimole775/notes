
new PushbackInputStream().unread();

// 所谓回推只是推到流的前端，其实根本没有多大的意义
// 而且，如果通过判断来进行回推，那么，会不会出现反复推和读同一个字节的情况？？？
``` java
PushbackInputStream pis = new PushbackInputStream(new DataInputStream(new FileInputStream("number.txt")));
if (pis.read() == 10) {
  pis.unread(); // 这里回推了，下一条还是10啊
}
```