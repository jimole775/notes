...把某个库的全局对象注册到所有模块下面，
    new webpack.ProvidePlugin({
        "_":"underscore"
    });

...类似这样，就可以在每个模块下面直接使用 _ 变量，而不需要require了