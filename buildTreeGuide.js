const prevUrl = 'https://github.com/jimole775/notes/tree/home'
const fs = require('fs')
const path = require('path')
const blackDir = ['.git','.github']
const preContent = 
`### 学习笔记
偶尔整理，随记居多。

### 结构
Notes: root`
const suffixContent = 
`<center>Copyright © 2020年 Rongxis. All rights reserved.`

const content = []

// `- []()`
// `   - []()`
// `       - []()`
function spill (prevPath, floders, level) {
  floders.forEach((floder) => {
    console.log(injectTabChar(level).length, level)
    content.push(`${injectTabChar(level)}- [${floder}](${prevUrl}/${floder})`)
    const curPath = path.join(prevPath, floder)
    const nextFloders = takeFloders(curPath)
    if (nextFloders.length && level < 2) spill(curPath, nextFloders, level+1)
  })
}

spill(__dirname, takeFloders(__dirname), 0)

fs.writeFileSync('README.md', `${preContent}\n${content.join('\n')}\n${suffixContent}`, 'utf8')

function takeFloders (dirPath) {
  const dirs = fs.readdirSync(dirPath)
  return dirs.filter(dir => isDirectory(dirPath, dir))
}

function injectTabChar (time) {
  return Array.from(Array(time)).fill('  ').join('')
}

function isDirectory (dirPath, dir) {
  const stat = fs.statSync(path.join(dirPath, dir))
  return !blackDir.includes(dir) && stat.isDirectory()
}
