1. 不支持 ?. 的编译
首先，确保依赖包有 typescript，并且版本 ^3.7.0 以上

2. 不支持 tsx 语法
可配置使用 ts-loader 去配合 vue-loader 一起工作
``` js
module.exports = {
  chainWebpack: config => {
    // config.module
    //   .rule('ts')
    //   .test(/\.tsx?$/)
    //   .exclude
    //     .add(/node_modules/)
    //     .end()
    //   .use('ts-loader')
    //     .loader('ts-loader')
    //     .options({
    //       appendTsSuffixTo: [/\.vue$/], // 确保 .vue 文件中的 <script lang="ts"> 能被识别
    //       // 其他 ts-loader 选项...
    //     })
    //     .end()
    // {
    //   test: /\.vue$/,
    //   loader: 'vue-loader',
    //   // options: require('./vue-loader.conf')
    //   options: {
    //     loaders: {
    //       ts: 'ts-loader', // 使用 ts-loader 处理 TypeScript
    //       tsx: 'ts-loader', // 也可以指定 tsx 的 loader，但通常 ts 就足够了
    //       // ...
    //     },
    //     // 其他 vue-loader 选项
    //   },
    // },
  }
}
```

3. vscode 对 ts 语法校验过度，需要合理配置


4. 服务器编译通过后，编辑器还是报红
- 可以尝试重启 vscode
- 可以尝试配置 .eslintrc
- 可以尝试 tsconfig.json

5. sourcemap 定位不精准
- 可以配置 tsconfig.json: `sourceMap: true`