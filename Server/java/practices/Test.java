import java.util.*;
import com.packsomething.TestPackage;
import com.packsomething.TestStatic;

public class Test{
    public  static void main(String[] arg){
        Random rand = new Random();
        for(int i = 0; i < rand.nextInt(10);i++){
            TestStatic a = new TestStatic();
            new a.TestPackageChildClass();
        }   
    }
}


class Try{

    public Try(){       
        System.out.println(id);
    }

    public void testFn(){
        System.out.println("is run testFn!");
    }

    private static int id;

    // static
    {
        id ++;
    }

}