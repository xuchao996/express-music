/**
 * Created by xuchao.
 */

export default {
  emailAddress () {
    return {
      'qq.com': 'http://mail.qq.com',
      'gmail.com': 'http://mail.google.com',
      'sina.com': 'http://mail.sina.com.cn',
      '163.com': 'http://mail.163.com',
      '126.com': 'http://mail.126.com',
      'yeah.net': 'http://www.yeah.net/',
      'sohu.com': 'http://mail.sohu.com/',
      'tom.com': 'http://mail.tom.com/',
      'sogou.com': 'http://mail.sogou.com/',
      '139.com': 'http://mail.10086.cn/',
      'hotmail.com': 'http://www.hotmail.com',
      'live.com': 'http://login.live.com/',
      'live.cn': 'http://login.live.cn/',
      'live.com.cn': 'http://login.live.com.cn',
      '189.com': 'http://webmail16.189.cn/webmail/',
      'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
      'yahoo.cn': 'http://mail.cn.yahoo.com/',
      'eyou.com': 'http://www.eyou.com/',
      '21cn.com': 'http://mail.21cn.com/',
      '188.com': 'http://www.188.com/',
      'foxmail.coom': 'http://www.foxmail.com'
    }
  },
  getUrlKey (name) {
    let reg = new RegExp(name + '=([^&]*)')
    let results = location.href.match(reg)
    return results ? results[1] : null
  },
  inputOnlyNumber (event, type) {
    let keyCode = event.keyCode
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
      if (event.key === 'e') event.returnValue = false
    } else {
      if (type === 'negative') {
        if (keyCode !== 109 && keyCode !== 45) {
          event.returnValue = false
        }
      } else {
        event.returnValue = false
      }
    }
  },
  formatDate (date, fmt) {
    if (typeof date === 'string') return date
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  },
  /**
   * @function 判断对象是否为空
   * @param {*} obj 可以接收 array object string
   * @returns true 代表当前为空
   *          false 代表当前不为空
   */
  isEmpty (obj) {
    if (typeof (obj) === 'string' && obj === '') return true
    else if (typeof (obj) === 'object' && obj instanceof Array && obj.length === 0) return true
    else {
      if (!(JSON.stringify(obj) === '{}') && !(JSON.stringify(obj) === 'null')) {
        return false
      }
      for (let i in obj) {
        return false
      }
      return true
    }
  },
  // 驼峰转下划线连
  togglecamelToUnderline (s) {
    return s.replace(/([A-Z])/g, '_$1').toLowerCase()
  },
  clickOutside: {
    bind (el, binding, vnode) {
      function documentHandler (e) {
        if (el.contains(e.target)) {
          return false
        }
        if (binding.expression) {
          binding.value(e)
        }
      }
      // eslint-disable-next-line
      var fn = new Function()
      el.__vueClickOutside__ = fn
      document.addEventListener('click', documentHandler)
    },
    unbind (el, binding) {
      document.removeEventListener('click', el.__vueClickOutside__)
      delete el.__vueClickOutside__
    }
  },
  firstUpperCase (str) {
    if (typeof str === 'string') {
      return str.toString()[0].toUpperCase() + str.toString().slice(1)
    } else {
      return str
    }
  },
  unique (array) {
    // res用来存储结果
    var res = []
    for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
      for (var j = 0, resLen = res.length; j < resLen; j++) {
        if (array[i] === res[j]) {
          break
        }
      }
      // 如果array[i]是唯一的，那么执行完循环，j等于resLen
      if (j === resLen) {
        res.push(array[i])
      }
    }
    return res
  },
  // 同变量实现复制
  copyVarHandler (ori, target) {
    /* mainFormatterInfo = {
      type: 'num',
      num: {
        digit: 2,
        millesimal: false
      },
      percent: {
        digit: 2
      }
    } */
    if (!target || JSON.stringify(target) === '{}') return ori
    for (let i in ori) {
      if (typeof ori[i] !== 'object') {
        ori[i] = target[i]
      } else {
        this.copyVarHandler(ori[i], target[i])
      }
    }
    return ori
  },
  /**
   * @param 事件对象
   * @param 最外层标签
   * @param 要获取的目标元素
   * @return 返回目标元素
   */
  findTargetTag (event, parent, target) {
    // 假设点击的元素在目标元素以内
    let parentTag = parent.toUpperCase()
    let targetTag = target.toUpperCase()
    return this.findParentTag(event.target, parentTag, targetTag)
    // tagName
  },
  findParentTag (currentNode, parent, target) {
    if (currentNode.tagName === target) {
      return currentNode
    } else if (currentNode.tagName === parent) {
      return null
    } else {
      return this.findParentTag(currentNode.parentNode, parent, target)
    }
  },
}
