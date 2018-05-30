/**
 * Foo
 */


public class Foo{
    public static void main(String[] args){
        Test test = new Test();
        TestFormula formula = new TestFormula();
        test.name();
        System.out.println("let's say hello!" + formula.trydo(9));
    } 
}

class Test{
    public void name() {
        System.out.println("apply name method!");
    }   
}

interface Formula {
    int calc();
    default int trydo(int a){
        return a * 10;
    }
}

class TestFormula implements Formula{
    @Override
    int trydo(int a){
        return a;
    }

    @Override
    String calc() {
        return "run calc!";
    }
}