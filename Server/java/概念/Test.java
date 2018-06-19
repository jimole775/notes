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
        System.out.println(a1.equals(a2));
    }

    static class A {  
        int age;  
        String home;  
    }  
}