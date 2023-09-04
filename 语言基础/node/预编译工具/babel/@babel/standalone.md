# 说明
浏览器端的使用方案，提供的api有限

不过集成了大部分的persets和plugins

当然，也可以单独导入其他的 persets 和 plugins

# 样例
- `jsx转vue`
``` js
import babel from '@babel/standalone/babel.min.js'
import jsx from 'babel-plugin-transform-vue-jsx' // vue-jsx专用插件
babel.transform(`<a onClick={alert('is ok')}>hello</a>`, {
  persets: [babel.avaliablePersets['es2015']],
  plugins: [jsx]
})
// => h('a', {on: {click: () => {alert('is ok')}}}, ['hello'])
```

- `jsx转react`
``` js
import babel from '@babel/standalone/babel.min.js'
babel.transform(`<a onClick={alert('is ok')}>hello</a>`, {
  persets: [babel.avaliablePersets['react']],
  plugins: [babel.avaliablePlugins['syntax-jsx']]
})
// => React.createElement('a', {onClick: () => {alert('is ok')}}, ['hello'])
```