import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/Login'
import Sign from '@/page/Sign'
import ForgetPsd from '@/page/ForgetPsd'
import ModifyPsd from '@/page/ModifyPsd'
import Order from '@/page/Order'
import Search from '@/page/Search'
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
      path: '/Search',
      name: 'Search',
      component: Search
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
