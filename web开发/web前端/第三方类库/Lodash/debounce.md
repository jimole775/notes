代理事件函数，并限制单位时间内的并发数量

主要用于input和鼠标滚轮之类的监听事件，这种监听会造成大量无意义的事件调用
``` js
import debounce from 'lodash/debounce'
const bunchEvent = debounce(bunchEvent, 500) // bunchEvent每500毫秒只能被触发一次
```
