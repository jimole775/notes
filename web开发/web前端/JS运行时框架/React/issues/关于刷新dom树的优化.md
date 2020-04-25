# 在什么情况下才会重复渲染子组件，如何避免
一般的情况下，通过 ```shouldComponentUpdate``` 钩子里面的diff算法，来判断是否需要重新渲染整个虚拟dom节点，(默认返回true,即重新渲染整个虚拟dom节点)

React官方提供的 ```PureRenderMixin``` 插件，可以避免不必要的节点渲染

使用方法如下：

``` js
    import PureRenderMixin from 'react-addons-pure-render-mixin';
    class FooComponent extends React.Component {
      constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      }

      render() {
        return <div className={this.props.className}>foo</div>;
      }
    }
```

[文章源地址](https://blog.csdn.net/sysuzhyupeng/article/details/62043149)