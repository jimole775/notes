const baseUrl = 'https://github.com/jimole775/notes/tree/home'
const fs = require('fs')
const path = require('path')
const blackDir = ['.git','.github', '.idea']
const preContent = 
`### 学习笔记
偶尔整理，随记居多。

### 结构
Notes: root`
const suffixContent = 
`<center>Copyright © 2020年 Rongxis. All rights reserved.`

const content = []
main()
// `- []()`
// `   - []()`
// `       - []()`
function main () {
  spill(baseUrl, __dirname, takeFloders(__dirname), 0)
  fs.writeFileSync('README.md', `${preContent}\n${content.join('\n')}\n${suffixContent}`, 'utf8')
}

function spill (preUrl, prePath, preFloders, level) {
  preFloders.forEach((floder) => {
    const curUrl = `${preUrl}/${encodeURIComponent(floder)}`
    const curPath = path.join(prePath, floder)
    const curFloders = takeFloders(curPath)
    content.push(`${injectTabChar(level)}- [${floder}](${curUrl})`)
    // 只显示3层
    if (curFloders.length && level < 2) spill(curUrl, curPath, curFloders, level+1)
  })
}

function takeFloders (dirPath) {
  const dirs = fs.readdirSync(dirPath)
  return dirs.filter(dir => isDirectory(dirPath, dir))
}

function injectTabChar (time) {
  return Array.from(Array(time)).fill('  ').join('')
}

function isDirectory (dirPath, dir) {
  const stat = fs.statSync(path.join(dirPath, dir))
  return !blackDir.includes(dir) && !/^\.(\w\d)+?$/i.test() && stat.isDirectory()
}
