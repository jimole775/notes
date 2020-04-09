package com.packsomething;

public class TestPackage{
    public TestPackage(){
        new TestPackageChildClass();
    }
    public class TestPackageChildClass{
        public TestPackageChildClass(){
            System.out.println("is run TestPackageChildClass");
        }
    }

    protected void protectedName() {
        System.out.println("protectedName");
    }

    void defaultName(){
        System.out.println("defaultName");
    }
}


