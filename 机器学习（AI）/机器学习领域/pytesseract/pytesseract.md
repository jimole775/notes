### tesseract图片识别库
windows下载地址： https://digi.bib.uni-mannheim.de/tesseract/

### pytesseract
<!-- py中需要先设置tess的路径 -->
``` py
pytesseract.pytesseract.tesseract_cmd = 'D:/Program Files (x86)/Tesseract-OCR/tesseract.exe'
tessdata_dir_config = '--tessdata-dir "D:/Program Files (x86)/Tesseract-OCR/tessdata"'
```