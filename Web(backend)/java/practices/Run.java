import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Array;
public class Run{
    
    public boid generic (){

    }

    public static void main(String[] arg) {
        MyArrayList arr = new MyArrayList();
        arr.set(3, 3);
        arr.set(4, "test");
        arr.set(5, true);
        arr.set(6, new MyArrayList());
        // Field fields = arr.getClass().getDeclaredFields();
        // Object obj = fields.get(arr);
        
        for (Method f : arr.getClass().getDeclaredMethods()) {
            System.out.println("Method:" + f.getName());
        }
        System.out.println(arr);
    }
}