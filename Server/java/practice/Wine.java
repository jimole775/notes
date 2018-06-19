
public class Wine{
    private String name;
    public Wine(){
        this.setName("wine");
    }

    public void setName(String name){
        this.name = name;
    }

    public void getName(){
        System.out.print(name) ;
    }


}

// class JNC extends Wine{
//     public JNC(){
//         super.setName("JNC");
//     }

//     public void main(){
        
//     }
// }

// class JGJ extends Wine{
//     public JGJ(){
//         super.setName("JGJ");
//     }
// }

// public class Test {
//     public static void main(String[] args) {
//         //定义父类数组
//         Wine[] wines = new Wine[2];
//         //定义两个子类
//         JNC jnc = new JNC();
//         JGJ jgj = new JGJ();
        
//         //父类引用子类对象
//         wines[0] = jnc;
//         wines[1] = jgj;
        
//         for(int i = 0 ; i < 2 ; i++){
//             System.out.println(wines[i].toString() + "--" + wines[i].drink());
//         }
//         System.out.println("-------------------------------");

//     }
// }
