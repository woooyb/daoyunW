import Vue from 'vue'
import Router from 'vue-router'
import Log from '@/components/Login/Log'
import Homepage from '@/components/Homepage'
import RecoverPassword from '@/components/RecoverPassword/RecoverPassword'
import MyInfo from '@/components/MyInfo/MyInfo'
import Register from '@/components/Register/Register'
import Notice from '@/components/Notice/Notice'
import ClassInfo from '@/components/ClassInfo/ClassInfo'
import Management from '@/components/Management/dist'
import DistData from '@/components/Management/distData'
import UserInfo from '@/components/UserInfo/UserInfo'
import Menu from '@/components/Management/Menu'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Log',
      component: Log
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/RecoverPassword',
      name: 'RecoverPassword',
      component: RecoverPassword
    },
    {
      path: '/Homepage',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/MyInfo/MyInfo',
      name: 'MyInfo',
      component: MyInfo
    },
    {
      path: '/ClassInfo',
      name: 'ClassInfo',
      component: ClassInfo
    },
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/Menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/Management',
      name: 'Management',
      component: Management,
      // children: [
      //   {
      //     path: 'distData/:id(\\d+)',
      //     //component: (resolve) => require(['@/views/system/dict/data'], resolve),
      //     name: 'Data',
      //     meta: { title: '字典数据', icon: '' }
      //   }
      // ]
    },
    {
      path: '/Management/distData/:code',   //(\\d+)
      name: 'Data',
      component: DistData
    }
  ]
})
