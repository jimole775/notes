1. chartClass (string) 
- is used to specify a CSS class to add to the created chart.

2. container (jQuery element)
- specifies the element that will contain the chart.

3. copyClasses (boolean) 
- specifies whether or not CSS classes should be copied from the source list to the associated chart nodes.

4. copyData (boolean) 
- specifies whether or not data attribute values should be copied from the source list to the associated chart nodes.

5. copyStyles (boolean) 
- specifies whether or not the CSS "style" attribute values should be copied from the source list to the associated chart nodes.

6. copyTitle (boolean) 
- specifies whether or not the "title" attribute values should be copied from the source list to the associated chart nodes.

7. depth (integer) 
- is used in conjunction with stack to configure at what level the stacking takes effect.

8. fade (boolean) 
- is used to enable a fading animation when showing/hiding chart nodes.

9. hoverClass (string) 
- is used to specify the CSS class that gets dynamically added to chart nodes on mouse-over.

10. interactive (boolean) 
- is used to enable interactive chart features, like clicking to show/hide child nodes.

11. levels (integer) 
- specifies how many levels deep in the source list are used to create the chart.

12. nodeClicked (function) 
- callback function invoked when a chart node is clicked: the first parameter is the underlying node element; the second parameter is the visual component that was clicked (a jQuery object).

13. nodeText (function) 
- callback function used to extract node text context.

14. replace (boolean) 
- true if the chart container should be emptied before generating the chart.

15. showLevels (integer) 
- specifies how many chart levels to show initially.

16. speed (jQuery speed) 
- specifies the animation speed if fade is enabled.

17. stack (boolean) 
- is used to enable stacking.

### 以上 都是一些静态配置，如果需要方法，那就只有从源码中逐个查找了