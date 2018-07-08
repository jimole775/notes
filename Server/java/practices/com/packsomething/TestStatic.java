package com.packsomething;
/**test javadoc API
 * @test again
 */
//A,B
interface AA{

}

interface BB{
    
}



public abstract class TestStatic{
    public TestStatic(){
        // new TestPackageChildClass();
    }
    
    public class TestPackageChildClass{
        public TestPackageChildClass(){
            System.out.println("is run TestPackageChildClass");
        }
    } 

    public abstract void getName();

}

