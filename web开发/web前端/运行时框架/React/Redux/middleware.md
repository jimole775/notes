``` js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // 用于处理异步action
import rootReducer from '../reducers/root_reducer';

const store = () => createStore(rootReducer, applyMiddleware(thunk));

export default store;
```
# 源码分析