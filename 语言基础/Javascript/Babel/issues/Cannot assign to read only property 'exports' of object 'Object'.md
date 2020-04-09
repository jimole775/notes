原因：

主要是混用了`import`和`module.exports`的编译问题

解决：

直接在`.babelrc`中追加 
`"plugins": [
    "transform-es2015-modules-commonjs"
]`

然后重新编译便可