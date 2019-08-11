touches, targetTouches, changedTouches 

# Difference
1. touches: A list of information for every finger currently touching the screen
2. targetTouches: Like touches, but is filtered to only the information for finger touches that started out within the same node
3. changedTouches: A list of information for every finger involved in the event (see below) To better understand what might be in these lists, let’s go over some examples quickly

# They vary in the following pattern:
1. When I put a finger down, all three lists will have the same information. It will be in changedTouches because putting the finger down is what caused the event.

> 第一根手指触摸屏幕，三个事件获取的值相同。


2. When I put a second finger down, touches will have two items, one for each finger. targetTouches will have two items only if the finger was placed in the same node as the first finger. changedTouches will have the information related to the second finger, because it’s what caused the event
> 第二根手指触摸屏幕，此时touches获取两个触摸点的信息。若触摸点在同一个对象上，targetTouches也获取两个触摸点的信息。changedTouches只保存第二个触摸点的信息。

 

3. If I put two fingers down at exactly the same time, it’s possible to have two items in changedTouches, one for each finger
> 若同时用两根手指触摸屏幕，changedTouches 有两个列表分别表示两个触摸点的信息。

 

4. If I move my fingers, the only list that will change is changedTouches and will contain information related to as many fingers as have moved (at least one)
> 如果移动触摸点，只有 changedTouches 会记录每个移动的触摸点信息

 

5. When I lift a finger, it will be removed from touches, targetTouches and will appear in changedTouches since it’s what caused the event
> 当一个触摸点离开，它的信息列表将从touches，targetTouches移除，但是changedTouches会保存此触摸点信息。

 

6. Removing my last finger will leave touches and targetTouches empty, and changedTouches will contain information for the last finger
> 最后一个触摸点离开，touches，targetTouches变成空值，而 changedTouches保存着最后一个离开的触摸点信息。