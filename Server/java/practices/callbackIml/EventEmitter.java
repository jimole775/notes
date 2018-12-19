// package callbackIml;
 
import inter.EventService;
import inter.EventHandler;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
public class EventEmitter implements EventService {
 
	private Map< String, List<EventHandler> >  eventMap = new HashMap< String, List<EventHandler> >();
	
	@Override
	public void on(String eventName, EventHandler EventHandler) {
		
		List<EventHandler> callbackList = eventMap.get(eventName);
		
		if( null == callbackList ){
 			callbackList =  new ArrayList<EventHandler>();
		}
 
		if( callbackList.isEmpty() ){
			eventMap.put(eventName, callbackList);
		}
		
		callbackList.add(EventHandler);
	}
 
	@Override
	public void remove(String eventName) {
 
		eventMap.remove( eventName );
	}
 
	@Override
	public void trigger( String eventName ) {
		
		List<EventHandler> callbackList = eventMap.get(eventName);
		
		for( EventHandler inter : callbackList ){
 
			inter.callback(this);
		}
		
	}
}
