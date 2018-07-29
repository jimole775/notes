import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class DoMain{

    public static void main(String[] arg){
        try{
            
            File direction = new File("");
            String filePath = direction.getAbsolutePath() + File.separator + "errs.dat";   

            ObjectAnalyzer obj = new ObjectAnalyzer();
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath));
            oos.writeObject(obj);
            oos.close();   

            ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filePath));
            ObjectAnalyzer staff = (ObjectAnalyzer)ois.readObject();     
            ois.close();
            
            System.out.println(staff.name);  
       

        }catch(Exception e){
            e.printStackTrace();
        }
    }
}

class ObjectAnalyzer implements Serializable{ //关键的一步：需要实现Serializable接口
    public String toString(Object obj){
        return "none";
    }
    public String name = "Andy";
    public int age = 31;
}