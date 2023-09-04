利用 ast 语法树，针对语法树结构中 **定义（VariableDeclarations）却未调用（CallExpression）** 的方法或变量，进行清除的操作

支持 tree-shaking 的构建工具有：vite、webpack4、