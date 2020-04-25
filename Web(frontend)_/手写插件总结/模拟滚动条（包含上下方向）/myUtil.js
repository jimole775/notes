
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
    const baseTimes = Number.parseInt((1).toFixed(bit).replace(/\./, ''))
    const roundStringArr = Math.round(Number.parseFloat(numberOrStr) * baseTimes).toString().split('')

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
    return res.join('')
  }
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
  obj && Object.keys(obj).forEach((key) => {
    (!!obj[key] || obj[key] === 0) && res.push(`${key}=${obj[key]}`)
  })
  return res.length ? `?${res.join('&')}` : ``
}
