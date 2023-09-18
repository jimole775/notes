
#conding:utf-8
import cv2
import numpy as np
from PIL import Image,ImageDraw,ImageFont,ImageOps
 
width=100
height=100
# 字体
font_path="C:\\Windows\\Fonts\\Arial.ttf"
img = Image.new("RGB", (width, height), "black")  # 黑色背景
draw = ImageDraw.Draw(img)
# 按宽度比例显示文字
font = ImageFont.truetype(font_path, int(width * 0.7))
# 白色字体
draw.text((5, 0), '7', (255, 255, 255), font=font)
img=np.array(img)
# cv2.imshow('img', img)
# 旋转图片
# angle=-45      #旋转角度
# center=(width/2,height/2)   #中心点
# M = cv2.getRotationMatrix2D(center, angle, 1.0)
# rotated = cv2.warpAffine(img, M, (width, height), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
# print(rotated)
# cv2.imshow('Input', rotated)
 
#扭曲图片，文字向左右扭曲5像素
pts1 = np.float32([[0, 0],[0, 100],[100, 100],[100, 0]])
pts2 = np.float32([[15, 0],[-15, 100],[45, 100],[75, 0]])
warp_mat = cv2.getPerspectiveTransform(pts1, pts2)
dst = cv2.warpPerspective(img, warp_mat, (width, height))
cv2.imshow('dst', dst)
cv2.waitKey(0)