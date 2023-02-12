import webview
from flask import Flask, render_template

# 实例化flask对象
# 默认 模板目录：templates
# 默认 静态目录：static
app = Flask(__name__)

# 定义路由渲染模板
@app.route('/')
def index():
    return render_template('/index.html')

window = webview.create_window('Woah dude!', url=app)
webview.start(gui='cef')
