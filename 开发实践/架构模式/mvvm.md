# vue中的实现：
``` vue
<template> <!--视图层 （view）-->
</template>
<script>
    new Vue({   // 核心层 （viewmodel）
        el: "",
        data: {}  // 数据模型（model）        
    })
</script>
```

# angular中的实现：
``` js
angular.module("app")
.directive(function () {
    return {
        template: "<div></div>",    // 视图层 （view）
        link: function ($scope) {  // 整个函数就是核心层 （viewmodel）, view和model的粘合剂
            console.log($scope) // $scope就是一个标准的数据模型（model）
        }
    }
})
```


