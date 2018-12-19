// package callbackIml;
 
public interface EventService {
	void on( String eventName, EventHandler e );
	
	void remove( String eventName );
	
	void trigger( String eventName );
}
