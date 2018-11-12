
const config = require('../../config')

var server_url = config.dev.proxyTable[Object.keys(config.dev.proxyTable)[0]].target

var server_img_base_url = server_url + '/images/base/'

var width = document.documentElement.clientWidth + 'px'
var height = document.documentElement.clientHeight + 'px'

let defaultAuthorization = ''
let defaultUsername = ''

try {
  if (localStorage.authorization) {
    defaultAuthorization = localStorage.authorization
  }
} catch(e) {}

try {
  if (localStorage.username) {
    defaultUsername = localStorage.username
  }
} catch(e) {}

export default {
  authorization: defaultAuthorization,
  user: {
    username : defaultUsername
  },
  server_url: server_url,
  init_data: {
    login_bg: server_img_base_url + 'login-bg.jpg',
    logo: server_img_base_url + 'logo.png',
    icon_user: server_img_base_url + 'icon-form-user.png',
    icon_passwd: server_img_base_url + 'icon-form-pwd.png',
    headpic_bg: server_img_base_url + 'headPic-bg.png',
    touxiang: server_img_base_url + 'touxiang.png',
    screenWidth: width,
    screenHeight: height
  }
}
