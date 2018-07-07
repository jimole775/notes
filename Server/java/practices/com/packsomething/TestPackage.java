package com.packsomething;

public class TestPackage{
 public TestPackage(){
     new TestPackageChildClass();
 }
 static class TestPackageChildClass{
    public TestPackageChildClass(){
        System.out.println("is run TestPackageChildClass");
    }
}
}

