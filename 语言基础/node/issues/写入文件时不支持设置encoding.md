这种情况一般发生在：
``` js
fs.writeFile('./file.txt', Buffer.from('text'), 'utf8')
```

**`原因`**：
如果写入的是buffer数据，那么，它是不支持设置encoding的

**`解决`**：
直接写入文本
``` js
fs.writeFile('./file.txt', 'text', 'utf8')
```
