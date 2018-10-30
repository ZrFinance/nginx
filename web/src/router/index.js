import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import LoginResetpasswd from '@/pages/login/components/resetpasswd'
import LoginStatusopen from '@/pages/login/components/statusopen'
import LoginResiter from '@/pages/login/components/Register'
import Home from '@/pages/home/Home'
import UserDetails from '@/pages/userdetails/Userdetails'
import PubNotice from '@/components/notice'
import PubLucky from '@/components/lucky'
import PubMessage from '@/components/message'
import PubPaypasswd from '@/components/pay_passwd'
import Pubpasswd from '@/components/passwd'
import PubVip from '@/components/vip'
import PubLuckylist from '@/components/luckylist'
import PubActivation from '@/components/activation'
import PubBypower from '@/components/buypower'
import Order from '@/pages/order/Order'
import Team from '@/pages/team/Team'
import sqbz from '@/components/sqbz'
import gqfh from '@/components/gqfh'
import tgbz from '@/components/tgbz'
import xsrc from '@/components/xsrc'
import tggq from '@/components/tggq'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register/:username',
      name: 'Register',
      component: LoginResiter
    },
    {
      path: '/resetpasswd',
      name: 'LoginResetpasswd',
      component: LoginResetpasswd
    },
    {
      path: '/statusopen',
      name: 'LoginStatusopen',
      component: LoginStatusopen
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/userdetails',
      name: 'UserDetails',
      component: UserDetails
    },
    {
      path: '/notice',
      name: 'PubNotice',
      component: PubNotice
    },
    {
      path: '/lucky',
      name: 'PubLucky',
      component: PubLucky
    },
    {
      path: '/luckylist',
      name: 'PubLuckylist',
      component: PubLuckylist
    },  
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/team',
      name: 'Team',
      component: Team
    },
    {
      path: '/message',
      name: 'PubMessage',
      component: PubMessage
    },
    {
      path: '/pay_passwd',
      name: 'PubPaypasswd',
      component: PubPaypasswd
    },
    {
      path: '/passwd',
      name: 'Pubpasswd',
      component: Pubpasswd
    },
    {
      path: '/buypower',
      name: 'PubBypower',
      component: PubBypower
    },
    {
      path: '/activation',
      name: 'PubActivation',
      component: PubActivation 
    },
    {
      path: '/vip',
      name: 'PubVip',
      component: PubVip 
    },
    {
      path: '/sqbz',
      name: 'sqbz',
      component: sqbz
    },
    {
      path: '/gqfh',
      name: 'gqfh',
      component: gqfh
    },
    {
      path: '/tgbz',
      name: 'tgbz',
      component: tgbz
    },
    {
      path: '/xsrc',
      name: 'xsrc',
      component: xsrc
    },
    {
      path: '/tggq',
      name: 'tggq',
      component: tggq
    }
  ]
})
