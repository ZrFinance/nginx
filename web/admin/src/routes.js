import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home'
import matchpool from './views/nav1/matchpool'
import tgbz from './views/nav1/tgbz'
import jsbz from './views/nav1/jsbz'
import userlist from './views/nav1/userlist'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/userlist', component: userlist, name: '用户列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '匹配管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/matchpool', component: matchpool, name: '匹配池' },
            { path: '/tgbz', component: tgbz, name: '提供帮助列表' },
            { path: '/jsbz', component: jsbz, name: '接受帮助列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '交易记录',
        iconCls: 'el-icon-message',
        children: [
        ]
    }
]

// let routes = [
//     {
//         path: '/login',
//         component: Login,
//         name: '',
//         hidden: true
//     },
//     {
//         path: '/404',
//         component: NotFound,
//         name: '',
//         hidden: true
//     },
//     //{ path: '/main', component: Main },
//     {
//         path: '/',
//         component: Home,
//         name: '后台首页',
//         iconCls: 'el-icon-message',//图标样式class
//         children: [
//             { path: '/main', component: Main, name: '主页', hidden: true },
//             { path: '/table', component: Table, name: 'Table' },
//             { path: '/form', component: Form, name: 'Form' },
//             { path: '/user', component: user, name: '列表' },
//         ]
//     },
//     {
//         path: '/',
//         component: Home,
//         name: '导航二',
//         iconCls: 'fa fa-id-card-o',
//         children: [
//             { path: '/page4', component: Page4, name: '页面4' },
//             { path: '/page5', component: Page5, name: '页面5' }
//         ]
//     },
//     {
//         path: '/',
//         component: Home,
//         name: '匹配系统',
//         iconCls: 'fa fa-id-card-o',
//         children: [
//             { path: '/page4', component: Page4, name: '页面4' },
//             { path: '/page5', component: Page5, name: '页面5' }
//         ]
//     },
//     {
//         path: '/',
//         component: Home,
//         name: '',
//         iconCls: 'fa fa-address-card',
//         leaf: true,//只有一个节点
//         children: [
//             { path: '/page6', component: Page6, name: '导航三' }
//         ]
//     },
//     {
//         path: '/',
//         component: Home,
//         name: 'Charts',
//         iconCls: 'fa fa-bar-chart',
//         children: [
//             { path: '/echarts', component: echarts, name: 'echarts' }
//         ]
//     },
//     {
//         path: '*',
//         hidden: true,
//         redirect: { path: '/404' }
//     }
// ];

export default routes;