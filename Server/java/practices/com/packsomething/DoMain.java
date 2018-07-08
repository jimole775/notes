package com.packsomething;
public class DoMain{
    public static void main(String[] arg){
        TestVistor child = new TestVistor();
         // super.protectedName();
        // super.defaultName();

        child.protectedName();
        child.defaultName();
    }
}