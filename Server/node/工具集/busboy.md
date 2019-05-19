# node上传工具

## 安装
``` bash
npm install -g busboy
```
## 样例
``` js
		var busboy = new Busboy({ headers: req.headers });
		
		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			console.log('fieldname:', fieldname);
			console.log('file:', file);
			console.log('filename:', filename);
			console.log('encoding:', encoding);
			console.log('mimetype:', mimetype);
		
			var saveTo = path.join(os.tmpDir(), path.basename(fieldname));
			file.pipe(fs.createWriteStream(saveTo));
		});
		busboy.on('finish', function() {
			res.writeHead(200, { 'Connection': 'close' });
			res.end("That's all folks!");
		});

		return req.pipe(busboy);
```