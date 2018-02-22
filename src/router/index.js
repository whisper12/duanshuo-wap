import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import Chapter from '@/components/Chapter'
// import UserCenter from '@/components/Home/UserCenter'
// import Search from '@/components/Search'
// import Navigator from '@/components/Home/Navigator'
// import Register from '@/components/Home/Register'
// import SetInfo from '@/components/Home/SetInfo'
// import Login from '@/components/Home/Login'
// import MsgLogin from '@/components/Home/MsgLogin'
// import UpdateInfo from '@/components/Home/UpdateInfo'
// import vSet from '@/components/Home/Set'
// import SearchRes from '@/components/SearchRes'

//按需加载组件方法
const Hello = r => require.ensure([], () => r(require('@/components/Hello')), 'group-foo1')
const Chapter = r => require.ensure([], () => r(require('@/components/Chapter')), 'group-foo2')
const UserCenter = r => require.ensure([], () => r(require('@/components/Home/UserCenter')), 'group-foo3')
const Search = r => require.ensure([], () => r(require('@/components/Search')), 'group-foo4')
const Navigator = r => require.ensure([], () => r(require('@/components/Home/Navigator')), 'group-foo5')
const Register = r => require.ensure([], () => r(require('@/components/Home/Register')), 'group-foo6')
const SetInfo = r => require.ensure([], () => r(require('@/components/Home/SetInfo')), 'group-foo7')
const Login = r => require.ensure([], () => r(require('@/components/Home/Login')), 'group-foo8')
const MsgLogin = r => require.ensure([], () => r(require('@/components/Home/MsgLogin')), 'group-foo9')
const UpdateInfo = r => require.ensure([], () => r(require('@/components/Home/UpdateInfo')), 'group-foo10')
const vSet = r => require.ensure([], () => r(require('@/components/Home/Set')), 'group-foo11')
const SearchRes = r => require.ensure([], () => r(require('@/components/SearchRes')), 'group-foo12')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Chapter/:id',
      name: 'Chapter',
      component: Chapter
    },
    {
      path: '/UserCenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
 	{
 		path: '/Navigator',
 		name: 'Navigator',
 		component: Navigator
 	},
 	{
 		path: '/Register',
 		name: 'Register',
 		component: Register
 	},
  {
    path: '/SetInfo',
    name: 'SetInfo',
    component: SetInfo
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/MsgLogin',
    name: 'MsgLogin',
    component: MsgLogin
  },
  {
    path: '/UpdateInfo',
    name: 'UpdateInfo',
    component: UpdateInfo
  },
  {
    path: '/Set',
    name: 'Set',
    component: vSet
  },
  {
    path: '/SearchRes/:type',
    name: 'SearchRes',
    component : SearchRes
  }                   
  ]
})
