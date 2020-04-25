# 使用场景

必须是每个iframe都拥有一个独立的store，一般是多系统联合的情况下使用

如果像后台管理系统那种只有一个store管理所有iframe的话，只使用window.postMessage()就行了