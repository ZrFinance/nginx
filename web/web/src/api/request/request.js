import { fetch } from './fetch'
import Vue from 'vue'

// 获取手机短信验证码
export function getSmsCode (data, callback) {
  return fetch({
    url: `/api/public/get_verification_code`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 上传图片
export function upload (data, callback) {
  return fetch({
    url: `/upload`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 获取图形验证码
export function getPicVercode (callback) {
  return fetch({
    url: `/api/public/getpicvercode`,
    method: 'get',
    params: {
    }
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 申请解冻
export function statusopen (data,callback) {
  return fetch({
    url: `/api/user/statusopen`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Vue.$vux.alert.show({
        content: "申请解冻成功！"
      })
    }
  }).catch(() => {
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 忘记密码
export function reset_passwd (data,callback) {
  return fetch({
    url: `/api/user/reset_passwd`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 注册
export function register (data,callback) {
  return fetch({
    url: `/api/user/register`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 登录
export function login (data,callback) {
  return fetch({
    url: `/api/user/login`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      console.log('1111111111')
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 获取轮播图
export function getBanner (callback) {
  return fetch({
    url: `/api/public/getbanner`,
    method: 'get',
    params: {}
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 获取通知信息
export function getNotice (callback) {
  return fetch({
    url: `/api/public/getnotice`,
    method: 'get',
    params: {}
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 抽奖
export function getLuckyIndex (params,callback,errorcallback) {
  return fetch({
    url: `/api/public/getluckyindex`,
    method: 'get',
    data: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        content: res.data.msg
      })
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 抽奖确认
export function ClickLucky (data,callback) {
  return fetch({
    url: `/api/public/clicklucky`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 抽奖查询
export function QueryLucky (callback) {
  return fetch({
    url: `/api/public/querylucky`,
    method: 'get',
    data: {}
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 订单查询
export function OrderQuery (params,callback) {
  return fetch({
    url: `/api/order/orderquery`,
    method: 'get',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 团队查询
export function TeamQuery (callback) {
  return fetch({
    url: `/api/public/teamquery`,
    method: 'get',
    params: {}
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 修改用户信息
export function Upduser (data,callback) {
  return fetch({
    url: `/api/public/userupd`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 激活
export function Activation (data,callback) {
  return fetch({
    url: `/api/public/activation`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 用户查询
export function Userquery (callback) {
  return fetch({
    url: `/api/public/userquery`,
    method: 'get',
    params: {}
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 修改二级
export function Updpaypasswd (data,callback) {
  return fetch({
    url: `/api/public/pay_passwdupd`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 修改登录
export function Updpasswd (data,callback) {
  return fetch({
    url: `/api/public/passwdupd`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 认筹权转账
export function Buypowerupd (data,callback) {
  return fetch({
    url: `/api/public/buypowerupd`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 认筹权转账
export function Activationupd (data,callback) {
  return fetch({
    url: `/api/public/activationupd`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 明细查询
export function Tranlistbquery (params,callback) {
  return fetch({
    url: '/api/public/tranlistbquery',
    method: 'get',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 申请帮助
export function OrderAdd (data,callback) {
  return fetch({
    url: `/api/order/orderadd`,
    method: 'POST',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Vue.$vux.alert.show({
        content: res.data.msg
      })      
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 订单详情
export function OrderobjQuery (params,callback) {
  return fetch({
    url: `/api/public/orderobjquery`,
    method: 'GET',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }  
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}

// 确认订单
export function OrderobConfirm (params,callback) {
  return fetch({
    url: `/api/public/orderobconfirm`,
    method: 'POST',
    data: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }  
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 股权分红查询
export function GqfhQuery (params,callback) {
  return fetch({
    url: `/api/public/gqfhquery`,
    method: 'GET',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }  
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 提供帮助额度查询
export function TgbzlimitQuery (params,callback) {
  return fetch({
    url: `/api/public/tgbzlimitquery`,
    method: 'GET',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }  
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 提供帮助
export function TgbzHandle1 (data,callback) {
  return fetch({
    url: `/api/public/tgbz`,
    method: 'POST',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Vue.$vux.alert.show({
        content: '提供帮助成功！'
      })
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}


// 新手认筹查询
export function XsrcQuery (callback) {
  return fetch({
    url: `/api/public/xsrcquery`,
    method: 'GET',
    params: {}
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      Vue.$vux.alert.show({
        title: '错误!',
        content: res.data.msg
      })
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }  
    }
  }).catch((error) => {
      console.log(error)
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
  })
}