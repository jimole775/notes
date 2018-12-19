
import java.io.ByteArrayInputStream;
import java.io.PushbackInputStream;

public class PushbackInputStreamDemo1 {
    public static void main(String[] args) throws Exception {
        String s = "abcdefg";
        /*
         * PushbackInputStream pbin = new PushbackInputStream(in)
         * 这个构造函数创建的对象一次只能回推一个字节
         */
        try (ByteArrayInputStream in = new ByteArrayInputStream(s.getBytes());
                        PushbackInputStream pbin = new PushbackInputStream(in)) {
            int n;
            while ((n = pbin.read()) != -1) {
                System.out.println((char) n);
                if('b' == n) pbin.unread('U');
            }
        }
    }
}