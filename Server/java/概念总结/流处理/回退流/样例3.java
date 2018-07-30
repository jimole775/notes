import java.io.ByteArrayInputStream;
import java.io.PushbackInputStream;

public class PushbackInputStreamDemo1 {
    public static void main(String[] args) throws Exception {
        String s = "abcdefg";
        /*
         * PushbackInputStream pbin = new PushbackInputStream(in,4)
         * 这个构造函数创建的对象一次可以回推一个缓存
         */
        try (ByteArrayInputStream in = new ByteArrayInputStream(s.getBytes());
                        PushbackInputStream pbin = new PushbackInputStream(in, 4)) {
            int n;
            byte[] buffer = new byte[4];
            while ((n = pbin.read(buffer)) != -1) {
                System.out.println(new String(buffer));
                //取回推缓存中的一部分数据 
                if(new String(buffer).equals("abcd"))pbin.unread(buffer,2,2);
                buffer = new byte[4];
            }
        }
    }
}