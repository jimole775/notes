import java.util.*;

public class Test{
    public  static void main(String[] arg){
        double i = 1.1d;
        int a = (int)i + 1;
        Integer b = 11;
        Integer c = new Integer(11);

        A a1 = new A();
        A a2 = new A();
        a1.age = 10;
        a2.age = 10;
        a1.home = "ning";
        a2.home = "ning";
        System.out.println(a1.home == a2.home);


        int[] arr = {12,3,4,5,2,6,1};
        int[] arr1 = {12,3,4,5,2,6,33};
        int[][] arr2 = {{1,2},{3,4}};   

        System.arraycopy(arr,1,arr1,4,2);

        System.out.println(Arrays.toString(arr1));
    }

    static class A {  
        int age;  
        String home;  
    }  

    // static class S{
    //     public S(){
    //         Scanner in = new Scanner(System.in);
    //         String name = in.nextLine();
    //         System.out.println(name);
    //     }

    // }

}