``` py
import asyncio
from PyQt5.QtCore import QTimer, QFuture, QFutureWatcher, Qt
from PyQt5.QtWidgets import QApplication

async def runEvent(a):
    await asyncio.sleep(1)
    return a * 3

if __name__ == "__main__":
    app = QApplication([])
    loop = asyncio.get_event_loop()
    future = loop.create_future()

    def onTimeout():
        result = loop.run_until_complete(runEvent(3))
        future.set_result(result) # 这里传导数据
    
    t = QTimer()
    t.timeout.connect(onTimeout)
    t.start(3000)

    # 这里监听数据
    watcher = QFutureWatcher()
    watcher.setFuture(future)

    def onFinished():
        result = watcher.result()
        app.quit()
    
    watcher.finished.connect(onFinished)

    app.exec_()
```