/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function() {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/** 数位修饰函数
 * @param numberOrStr [String|Number]
 * @param bit [Number]
 * @return [String]
 * @template = fixedNumber(1.225)(2) => '1.23'
 * @template = fixedNumber(1.225)(3) => '1.225'
 * @template = fixedNumber(1.225)(4) => '1.2250'
 */
export function fixedNumber(numberOrStr) {
  return function fixed(bit) {
    // 空类型不处理
    if (numberOrStr === null || numberOrStr === undefined || numberOrStr === '') return ''
    // 保留原数字，用作正负数的标记
    const originNumber = Number.parseFloat(numberOrStr)
    // 非数字类型不处理
    if (Number.isNaN(originNumber)) return ''
    // 计算用绝对值
    const absNumber = Math.abs(originNumber)
    const baseTimes = Number.parseInt((1).toFixed(bit).replace(/\./, ''))
    const roundStringArr = Math.round(absNumber * baseTimes)
      .toString()
      .split('')

    // 补全类似 0.0001 这种小数类型，获取到的数列长度不正确引起的各种问题
    if (roundStringArr.length < bit) {
      let suffixTimes = bit - roundStringArr.length
      while (suffixTimes--) {
        roundStringArr.unshift(0)
      }
    }

    const res = []
    for (let i = 0; i < roundStringArr.length; i++) {
      if (i === roundStringArr.length - bit) {
        res.push('.')
      }
      res.push(roundStringArr[i])
    }

    // 如果是小于零的小数，需要补足个位的 '0'
    // 否则只能返回 '.001' 这种字符串
    if (res[0] === '.') {
      res.unshift(0)
    }

    // 处理负数，如果是负数，在首位增加 负号
    if (originNumber < 0) {
      res.unshift('-')
    }

    return Number.parseFloat(res.join(''))
  }
}

/** 修饰钱类型的数值的位数
 * @param numberOrStr [String|Number]
 * @param decimal [Number]
 * @return [String]
 * @template = formatMoney(0.0512) => 0.05
 * @template = formatMoney(100000.0512) => 100,000.05
 */
export function formatMoney(numberOrStr, decimal = 2) {
  // 空类型不处理
  if (numberOrStr === null || numberOrStr === undefined || numberOrStr === '') return ''
  // 保留原数字，用作正负数的标记
  const originNumber = Number.parseFloat(fixedNumber(numberOrStr)(decimal))
  // 非数字类型不处理
  if (Number.isNaN(originNumber)) return ''
  // 计算用绝对值
  const str = Math.abs(originNumber) + ''
  const intStr = str.split('.')[0] || '' // 保存整数位
  const decimalStr = str.split('.')[1] || '' // 保存小数位
  if (intStr.length < 5) return str
  const res = []
  let step = 3
  let i = intStr.length
  while (i--) {
    if (step === 0) {
      step = 3
      res.unshift(',')
    }
    step--
    res.unshift(intStr[i])
  }
  // 处理负数，如果是负数，在首位增加 负号
  if (originNumber < 0) {
    res.unshift('-')
  }

  // 处理小数位
  const decimalArr = []
  if (decimalStr.length) {
    decimalArr.push('.')
    decimalArr.push(decimalStr)
  }
  return res.concat(decimalArr).join('')
}

/** 把对象转换成的urlquery字段
 * @param obj [Object]
 * @return [String]
 * @template = urlParam({a: 1}) => '?a=1'
 * @template = urlParam({a: ''}) => ''
 * @template = urlParam({}) => ''
 */
export function urlParam(obj) {
  const res = []
  obj &&
    Object.keys(obj).forEach(key => {
      (!!obj[key] || obj[key] === 0) && res.push(`${key}=${encodeURIComponent(obj[key])}`)
    })
  return res.length ? `?${res.join('&')}` : ``
}

/** 处理blob类型的输入流
 * @param blob [Blob]
 * @param downFileName [String] 传过来的文件名加前缀
 * @return null
 */
export function downloadBlobFile(blob, downFileName, extension = 'xls') {
  const win = window
  const dateObj = new Date()
  const timeSign = `${dateObj.getFullYear()}${dateObj.getMonth() +
    1}${dateObj.getDate()}${dateObj.getHours()}${dateObj.getMinutes()}${dateObj.getSeconds()}`
  const fileName = `${downFileName || ''}${timeSign}`
  if (Object.prototype.toString.call(blob) === '[object Blob]') {
    if ('download' in win.document.createElement('a')) {
      const url = win.URL.createObjectURL(blob)
      const link = win.document.createElement('a')
      link.id = '__downloadLink__'
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName + '.' + extension)
      win.document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        win.URL.revokeObjectURL(link.href) // 释放URL 对象
        win.document.body.removeChild(link)
      }, 500)
    } else {
      win.navigator.msSaveBlob(blob, fileName + '.' + extension)
    }
  } else {
    throw new Error('服务器返回的数据类型不正确')
  }
}

/** 数组对象根据key值去重
 * @param arr [{}]数组对象
 * @param key [String] 传过来对比属性名
 * @return [{}]
 */
export function deDuplication(arr = [], key) {
  const obj = {}
  return arr.reduce((cur, pre) => {
    obj[pre[key]] ? '' : (obj[pre[key]] = true && cur.push(pre))
    return cur
  }, [])
}

/** 心跳程序
 * @param url [String]
 * @param callback [Function] # 回调
 * @param breakMark [String|Number|Boolean] # 心跳中断的信号，默认为 2
 * @return null
 * @template = heartbeat('localhost', (res) => {console.log('心跳完成', res)}) => null
 */
export async function heartbeat(url, callback, breakMark = 2) {
  const res = await axios.get(url)
  if (res.code === 200) {
    if (res.data === breakMark) {
      return callback && callback(res)
    } else {
      setTimeout(() => {
        return heartbeat(url, callback, breakMark)
      }, 5000)
    }
  } else {
    return callback && callback(res)
  }
}

/** 验证输入的有效性
 * @param txt [String]
 * @return Boolean
 * @template = isLegalTypes('asd测试232342@#()（）') => true
 * @template = isLegalTypes('"引用"也不可以') => false
 * @template = isLegalTypes('5%似乎不可以') => false
 * @template = isLegalTypes(' ') => true
 */
export function isLegalTypes(txt) {
  if (Object.prototype.toString.call(txt) !== '[object String]') return false
  return /^[\u4E00-\u9FA5|a-z|A-Z|0-9|@#()（）……&—_\-\s\']+$/.test(txt)
}

export function verticalScroll() {
  // 如果表格有 "左固定" 和 "右固定"，那么头将会有 3 个
  // 3个头分别是
  // 左头：.ant-table-fixed-left .ant-table-thead
  // 右头：.ant-table-fixed-right .ant-table-thead
  // 内容头：.ant-table-scroll .ant-table-thead
  // # 【内容头】包含【左头】和【右头】的所有字段，所以用它作为基础头 "baseHead"，用来计算宽度
  const titleHeight = 54
  const tableWrap = document.querySelector('.ant-table-wrapper')
  const tableReact = tableWrap.getBoundingClientRect()
  let baseHead = tableWrap.querySelector('.ant-table-scroll .ant-table-thead')
  if (!baseHead) baseHead = tableWrap.querySelector('.ant-table-thead')

  /** 备注：暂不支持多层头 
   * 因为多层头的宽度计算比较复杂
  **/
  if (baseHead.querySelectorAll('tr').length > 1) return false

  /** 备注：不支持有左右滚动条的表格 
   * 因为现在的需求需要在一页里面显示横向滚动条
   * 这样就导致要使用ant-table本身的scrollConfig来进行配置
   * ant-table本身会对表格头部进行改造，
   * 那么当前 function verticalScroll(){} 的方案就会和 ant-table 的方案形成冲突
  **/
  if (baseHead.getBoundingClientRect().width > tableReact.width) return false

  const coverLeft = createCoverLayer(tableReact, 'left')
  const coverRight = createCoverLayer(tableReact, 'right')
  const baseTop = tableReact.top || 0
  const baseThsWidth = recordBaseHeadWidth(baseHead)
  // 由于可以自定义表头，所以，每次滚动都需要重新获取头部dom
  const fixedHeads = tableWrap.querySelectorAll('.ant-table-thead')
  // 循环所有头，逐个设置布局和宽度
  fixedHeads.length && Array.prototype.forEach.call(fixedHeads, (head) => {
    const headReact = head.getBoundingClientRect()
    const syncLeft = headReact.left || 0
    const syncWidth = headReact.width || 0
    const syncHeight = headReact.height || 0
    // 下面的 if 语句的判断，需要预留出一个无响应的区间(syncHeight)，
    // 防止滚动高度的变化造成的页面抖动
    if (baseTop > titleHeight + syncHeight) {
      tableWrap.style.marginTop = 0
      coverLeft.style.visibility = 'hidden'
      coverRight.style.visibility = 'hidden'
      head.style.position = 'relative'
      head.style.top = 0
      head.style.zIndex = 0
      head.style.left = 0
    } else if (baseTop < titleHeight) {
      tableWrap.style.marginTop = syncHeight + 'px'
      coverLeft.style.visibility = 'visible'
      coverRight.style.visibility = 'visible'
      head.style.position = 'fixed'
      head.style.top = titleHeight + 'px'
      head.style.width = syncWidth + 'px'
      head.style.left = syncLeft + 'px'
      head.style.zIndex = 2
      setThWidth(head, baseThsWidth)
    }
  })

  function recordBaseHeadWidth(baseHead) {
    const res = []
    const baseThs = baseHead.querySelectorAll('th')
    for (let i = 0; i < baseThs.length; i++) {
      const thItem = baseThs[i]
      res.push({
        key: thItem.getAttribute('key'),
        width: thItem.getBoundingClientRect().width
      })
    }
    return res
  }

  function setThWidth(head, baseThsWidth) {
    const ths = head.querySelectorAll('th')
    let loop = ths.length
    while (loop--) {
      const th = ths[loop]
      const key = th.getAttribute('key')
      if (key === 'selection-column') {
        th.style.width = '60px'
        continue
      }
      for (let j = 0; j < baseThsWidth.length; j++) {
        const item = baseThsWidth[j]
        if (item.key === key) {
          th.style.width = item.width + 'px'
          break
        }
      }
    }
  }

  // 由于表格头部在设置为 fixed 时，两边会出现溢出的情况，所以必须创建两个遮罩层，挡掉溢出的内容
  function createCoverLayer(baseHeadReact, position = 'left') {
    const menuBar = document.querySelector('.ant-layout-sider')
    const isCreated = document.querySelector('#fixedTableHeadCoverLayer' + position)
    if (isCreated) return isCreated
    const cover = document.createElement('div')
    cover.style.width = baseHeadReact.left - menuBar.getBoundingClientRect().width + 'px'
    cover.style.height = '100px'
    cover.style.position = 'fixed'
    cover.style.top = '54px' // 54px是头部栏的高度
    cover.style.zIndex = 11
    cover.style.background = '#f7f8fb'
    cover.style.visibility = 'hidden'
    cover.setAttribute('id', 'fixedTableHeadCoverLayer' + position)
    if (position === 'left') {
      cover.style.left = menuBar.getBoundingClientRect().width + 'px'
    } else {
      cover.style.right = 0
    }
    const whitePart = document.createElement('div')
    whitePart.style.background = '#fff'
    whitePart.style.width = '1rem' // 1rem 是展示栏的padding值
    whitePart.style.height = '100%'
    whitePart.style.position = 'absolute'
    if (position === 'left') {
      whitePart.style.right = 0
    } else {
      whitePart.style.left = 0
    }
    // whitePart.style.right = 0
    whitePart.style.top = 0
    cover.appendChild(whitePart)
    document.body.appendChild(cover)
    setInterval(() => {
      // 每两秒钟设定一下cover的left值，以防止用户点击 “缩/展” 左边菜单栏造成的cover错位的问题
      if (position === 'left') {
        cover.style.left = menuBar.getBoundingClientRect().width + 'px'
      } else {
        cover.style.right = 0
      }
    }, 2000)
    return cover
  }
}

export function horizontalScroll(evt) {
  const tableWrap = document.querySelector('.ant-table-wrapper')
  let fixedHead = tableWrap.querySelector('.ant-table-scroll .ant-table-thead')
  if (!fixedHead) fixedHead = tableWrap.querySelector('.ant-table-thead')
  const tableReact = tableWrap.getBoundingClientRect()
  const baseLeft = tableReact.left || 0
  const target = evt.target || {}
  fixedHead.style.left = (-target.scrollLeft + baseLeft) + 'px'
}

export function isArray(target) {
  return Object.prototype.toString.call(target) === '[object Array]'
}

export function isEmptyArray(target) {
  return isArray(target) && target.length === 0
}

export function isNotEmptyArray(target) {
  return isArray(target) && target.length > 0
}

export function isObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

export function isEmptyObject(target) {
  return isObject(target) && Object.keys(target).length === 0
}

export function isEmpty(target) {
  return target === null || target === undefined || target === ''
}
