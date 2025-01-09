1. 小程序开发工具，在开启一段时间之后，会出现指针丢失的问题！
- 这时候，需要清缓存：`rmdir /s /q node_modules\\.cache && npm cache clean --force || rm -rf node_modules/.cache && npm cache clean --force`，并且删除 dist，重新执行构建指令。
