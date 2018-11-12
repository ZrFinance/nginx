import axios from 'axios'
import Vue from 'vue'
import store from '@/store'

export function fetch (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': store.state.authorization
      },
      timeout: 60 * 1000 // 120秒超时
    })
    instance.interceptors.request.use(config => {
      Vue.$vux.loading.show({
        text: '加载中...'
      })
      return config
    }, error => {
      Vue.$vux.alert.show('加载超时')
      return Promise.reject(error)
    })
    instance.interceptors.response.use(data => {// 响应成功关闭loading
      Vue.$vux.loading.hide()
      return data
    }, error => {
      Vue.$vux.alert.show({
        title: '错误!',
        content: '请求失败!'
      })
      return Promise.reject(error)
    })
    instance(options)
      .then(response => { // then 请求成功之后进行什么操作
        resolve(response) // 把请求到的数据发到引用请求的地方
      })
      .catch(error => {
        Vue.$vux.loading.hide()
        console.log('请求异常信息：' + error)
        reject(error)
      })
  })
}
