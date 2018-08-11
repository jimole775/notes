import java.net.*;
import java.io.*;
import java.util.*;
public class SocketTest{
    public static void main(String[] args){

        try {
            Socket s = new Socket("10.88.2.55",8080);
            InputStream is = s.getInputStream();
            Scanner scn = new Scanner(is);
            while(scn.hasNextLine()){
                String line = scn.nextLine();
                System.out.println(line);
            }
            s.close();
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
        }
       

    }
} 