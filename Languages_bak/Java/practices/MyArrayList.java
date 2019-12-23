
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.util.Arrays;

public class MyArrayList {

    private Object[] store = new Object[10];

    public Object get(int index) {
        return Array.get(store, index);
    }

    public void set(int index, Object object) {

        if (index > Array.getLength(store))
            store = Arrays.copyOf(store, index);

        Array.set(store, index, object);
    }

    public String toString() {
        String result = "[";
        for (int i = 0; i < Array.getLength(store); i++) {
            if (store[i] instanceof String) {
                result += store[i] + ",";
            }
            if (store[i] instanceof Integer) {
                result += store[i] + ",";
            }
            if (store[i] instanceof Boolean) {
                result += String.valueOf(store[i]) + ",";
            }
            if (store[i] == null) {
                result += String.valueOf(store[i]) + ",";
            }

            // if (store[i] instanceof Object && ) {
            // Field fields = new Field(store[i]);
            // if(fields.get(store[i]))
            // result += store[i].toString() + ",";
            // }
        }
        return result += "]";
    }
}