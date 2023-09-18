一般 logger 只有在多线程的时候才使用，单线程的话，似乎没有什么理由使用 logger

# 需要在主线程进行配置
1. looging.basicConfig(filename='example.log', level=logging.DEBUG)

# 注意：上面level设置的是显示的最低严重级别，小于level 设置的最低严重级别将不会打印出来
looging.debug('xxx')
looging.info('xxx')
looging.debug('xxx')
looging.warning('xxx')
looging.error('xxx')
