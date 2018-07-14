package common;
public class ObjectAnalyzer{
    static String r = "";
    static String toString(Object obj){


        if(obj == null) return "null"; //递归出口

        if(visited.contains(obj)) return "..."; //递归出口

        visited.add(obj); //先装进数组列表

        Class cl = obj.getClass(); //获取class对象

        if(cl == String.class)return (String) obj; //如果对象是由String构造的，就强制转换成String

        if(cl.isArray()){   //如果当前入参的是个数组，就进行循环递归，扫描每个元素值

            r = cl.getComponentType() + "[]{";

            for(ini i = 0;i < Array.getLength(obj); i++){
                if(i > 0) r += ",";
                Object val = Array.get(obj,i);
                if(cl.getComponentType().isPrimitive()) r += val;
                else r += toString(val);    //递归；             
            }

            return r + "}";
        }

        // 如果是非数组，就用getDeclaredFields来获取所有字段，再循环递归
        String r = cl.getName();

        do{
            r += "[";
            Field[] fields = cl.getDeclaredFields();
            AccessibleObject.setAccessible(fields,true); //打开字段的访问权限；
            for(Field f:fields){
                if(!Modifier.isStatic(f.getModifiers())){ //判断字段是否是静态类型？
                    if(!r.endsWith("[")) r += ",";
                    r += f.getName() + "=";
                    try{
                        Class t = f.getType();
                        Object val = f.get(obj);
                        if(t.isPrimitive()) r += val; //如果是基础类型，就直接相加
                        else r += toString(val); //否则就进入递归
                    }
                    catch(Exception e){
                        e.printStackTrace();
                    }
                }
            }
            r += "]";
            cl = cl.getSuperclass(); //最后获取父类？用父类进行空指针判断？？
        }
        while(cl != null);

        return r;
    }

    private ArrayList<Object> visited = new ArrayList<Object>();
}

