## Can't perform a React state update on an unmounted component
componentDidUpdate方法内部使用了异步方法，并在异步方法里面修改了this.state属性，导致无限的触发componentDidUpdate方法，导致内存溢出
