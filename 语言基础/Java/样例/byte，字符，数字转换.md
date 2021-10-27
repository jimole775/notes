Java与其他语言编写的程序进行tcp/ip socket通讯时，通讯内容一般都转换成byte数组型，java在字符与数组转换也是非常方便的；

1. 将字符转换成byte数组
``` java
  String  str = "罗长";
  byte[] sb = str.getBytes();
```

2. 将byte数组转换成字符
``` java
  byte[] b = { (byte)0xB8, (byte)0xDF, (byte)0xCB, (byte)0xD9 }; 
  String str= new String (b);
```

3. 为了方便字符的加减操作，通常以16进制字符替代普通字符与byte数组进行相互转换
``` java
 /**
  * 16进制的字符串表示转成字节数组
  * @param hexString 16进制格式的字符串
  * @return 转换后的字节数组
  **/
  public static byte[] toByteArray(String hexString) {
    if (StringUtils.isEmpty(hexString))
      throw new IllegalArgumentException("this hexString must not be empty");
  
    hexString = hexString.toLowerCase();
    final byte[] byteArray = new byte[hexString.length() / 2];
    int k = 0;
    for (int i = 0; i < byteArray.length; i++) {//因为是16进制，最多只会占用4位，转换成字节需要两个16进制的字符，高位在先
      byte high = (byte) (Character.digit(hexString.charAt(k), 16) & 0xff);
      byte low = (byte) (Character.digit(hexString.charAt(k + 1), 16) & 0xff);
      byteArray[i] = (byte) (high << 4 | low);
      k += 2;
    }
    return byteArray;
  }

 /**
  * 字节数组转成16进制表示格式的字符串
  * @param byteArray 需要转换的字节数组
  * @return 16进制表示格式的字符串
  **/
  public static String toHexString(byte[] byteArray) {
    if (byteArray == null || byteArray.length < 1)
    throw new IllegalArgumentException("this byteArray must not be null or empty");
  
    final StringBuilder hexString = new StringBuilder();
    for (int i = 0; i < byteArray.length; i++) {
      // 0~F前面不零
      if ((byteArray[i] & 0xff) < 0x10) hexString.append("0");
      hexString.append(Integer.toHexString(0xFF & byteArray[i]));
    }
    return hexString.toString().toLowerCase();
  }
```