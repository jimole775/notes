随着Chrome 76的发布，谷歌修复了一个漏洞：允许网站检测访问者是否使用了隐身模式。然而，这些方法仍然可以检测到Google Chrome无痕模式。

这之中为我们提供了数个检测方法，但在此仅贴出一例及其源代码。

通过文件系统配额检测隐身模式
由于谷歌决定隐身模式使用计算机内存作为临时文件系统，因此我们可以根据内部文件系统为浏览器预留的存储量来开辟一种检测隐身模式的新方法。

安全研究员Vikas Mishra在研究中提出，他发现Chrome为隐身模式使用的临时内存文件系统分配的存储空间的最大配额为120MB。

“根据上述观察结果，隐身和非隐身模式之间临时存储配额的主要差异在于，隐身模式有一个硬性限制为120MB，而非隐身模式则没有这种限制。从上表中可以看出，临时存储配额小于120MB，而在非隐身模式下设备存储必须小于2.4GB。然而，在实际情况中，我们可以放心地认为，当前地绝大多数设备的存储空间都超过了2.4GB。”

Mishra利用这些观察结果编写了一个脚本，用于查询分配给浏览器文件系统的配额，如果该配额少于120MB，则表示浏览器处于隐身模式。

BleepingComputer以Mishra的脚本的为基础，提出了一个简单的验证概念来演示这种技术，如源代码所示：

``` js
async function start() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
        const {usage, quota} = await navigator.storage.estimate();0
        console.log(`Using ${usage} out of ${quota} bytes.`);
        if(quota < 120000000){
            alert('We see you! You are incognito!')
            console.log('Incognito')
        } else {
            alert('Not incognito!')
            console.log('Not Incognito')
        }    
    } else {
        console.log('Can not detect')
    }
}
start();
```