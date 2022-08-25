配置 tsconfig.json
``` yml
{
    "compilerOptions": {
        "module": "es6",
        "target": "es5",
        "jsx": "react", #用于检查jsx语法
        "moduleResolution": "node",
        "esModuleInterop": true,
        "lib":[
            "dom","dom.iterable" #用于检查类似于 document 之类的对象
        ]
    },
    "include": [
        "./src/"
    ]
}
```