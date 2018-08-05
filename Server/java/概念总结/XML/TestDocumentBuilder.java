import java.io.*;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import org.w3c.dom.*;
public class TestDocumentBuilder{
    public static void main(String[] arg){
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();    
            File xml = new File("./test.xml"); 
            Document doc = builder.parse(xml);
            Element root = doc.getDocumentElement();
            NodeList children = root.getChildNodes();
      
            for (int i = 0; i < children.getLength(); i++) {
                Node child = children.item(i);
                // Element childEl = (Element) child;
                // Text textNode = (Text)childEl.getFirstChild();
                System.out.println("node descrition:" + "[" + child.getNodeName().trim() + ":" + child.getTextContent().trim() + "]");

            }
        } catch (Exception e) {
            e.getStackTrace();
        }    
    }
}