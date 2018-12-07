import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/Login'
import Sign from '@/page/Sign'
import ForgetPsd from '@/page/ForgetPsd'
import ModifyPsd from '@/page/ModifyPsd'
import Order from '@/page/Order'
import OrderDetail from '@/page/OrderDetail'
import Search from '@/page/Search'
import GongXuList from '@/page/GongXuList'
import GongXuDetail from '@/page/GongXuDetail'
import Scan from '@/page/Scan'
import My from '@/page/My'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Sign',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/ModifyPsd',
      name: 'ModifyPsd',
      component: ModifyPsd
    },
    {
      path: '/ForgetPsd',
      name: 'ForgetPsd',
      component: ForgetPsd
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/OrderDetail/:id',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/GongXuList',
      name: 'GongXuList',
      component: GongXuList
    },
    {
      path: '/GongXuDetail',
      name: 'GongXuDetail',
      component: GongXuDetail
    },
    {
      path: '/Scan',
      name: 'Scan',
      component: Scan
    },
    {
      path: '/My',
      name: 'My',
      component: My
    },
    {path: '*', redirect: '/Login'}
  ]
})
// 登录控制
router.beforeEach((to, from, next) => {
  next()
})
export default router
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
