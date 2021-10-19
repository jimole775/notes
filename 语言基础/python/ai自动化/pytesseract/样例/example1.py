# 解读图片文本的样例
import pytesseract
from PIL import Image
from PIL import ImageFilter
pytesseract.pytesseract.tesseract_cmd = 'D:\\Tesseract-OCR\\tesseract.exe'
tessdata_dir_config = '--tessdata-dir "D:\\Tesseract-OCR\\tessdata"'
image = Image.open('.\\assets\\text.jpg')
wb_image = image.convert('L')
# edgeF = wb_image.filter(ImageFilter.BLUR)
# conF = wb_image.filter(ImageFilter.CONTOUR)
# image.thumbnail((1000, 500), Image.ANTIALIAS)
bigger = image.resize((wb_image.size[0] * 2, wb_image.size[1] * 2), Image.ANTIALIAS)
bigger.save('.\\assets\\text_3.jpg')
# edgeF.save('E:\\automatic\\assets\\text_1.jpg')
# conF.save('E:\\automatic\\assets\\text_2.jpg')
content = pytesseract.image_to_string(bigger)   # 解析图片
print(content)
