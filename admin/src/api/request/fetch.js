import axios from 'axios'
// import { Message  } from 'element-ui';

export function fetch (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30 * 1000 // 30秒超时
    })
    instance(options)
      .then(response => { // then 请求成功之后进行什么操作
        resolve(response) // 把请求到的数据发到引用请求的地方
      })
      .catch(error => {
        console.log('请求异常信息：' + error)
        reject(error)
      })
  })
}
