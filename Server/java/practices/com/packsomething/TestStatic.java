package com.packsomething;
public class TestStatic{
    public TestStatic(){
        // new TestPackageChildClass();
    }
    
    public class TestPackageChildClass{
        public TestPackageChildClass(){
            System.out.println("is run TestPackageChildClass");
        }
    } 

    static void tryUnqiue(int a){

    }
    static void tryUnqiue(String b){
            
    }
}

