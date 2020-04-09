import java.io.ByteArrayInputStream;
import java.io.PushbackInputStream;

public class PushbackInputStreamDemo1 {
    public static void main(String[] args) throws Exception {
        String s = "abcdefg";
        /*
         * PushbackInputStream pbin = new PushbackInputStream(in,3)
         * 这个构造函数创建的对象一次可以回推一个缓存
         */
        try (ByteArrayInputStream in = new ByteArrayInputStream(s.getBytes());
                        PushbackInputStream pbin = new PushbackInputStream(in, 3)) {
            int n;
            byte[] buffer = new byte[3];
            while ((n = pbin.read(buffer)) != -1) {
                System.out.println(new String(buffer));
                if(new String(buffer).equals("abc"))pbin.unread(new byte[]{'M','N','O'});
                buffer = new byte[3];
            }
        }
    }
}