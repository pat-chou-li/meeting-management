import Vue from 'vue'
import VueRouter from 'vue-router'
const addMeetingRoom = ()=>import('@/components/addMeetingRoom')
const reserveMeetingRoom = () => import('@/components/reserveMeetingRoom')
const success = ()=> import('@/components/success')
const login = ()=> import('@/components/login')
const register = ()=> import('@/components/register')
const checkMeetingRoom = ()=> import('@/components/checkMeetingRoom')
const changeMeetingRoom = ()=> import('@/components/changeMeetingRoom')
// const upload = ()=> import('@/components/upload')
import upload from "@/components/upload";
import home from "@/components/home";
import addperson from "@/components/addperson";
import profile from "@/components/profile";
const record = ()=> import('@/components/record')
const changeRecord = ()=> import('@/components/changeRecord')
const  myMeeting = ()=> import('@/components/myMeeting')
const notice = ()=> import('@/components/notice')
Vue.use(VueRouter)
const routes = [
  {
    path: '/addMeetingRoom',
    name: '添加会议室',
    component: addMeetingRoom
  },
  {
    path: '/reserveMeetingRoom',
    name: '预约会议室',
    component: reserveMeetingRoom
  },
  {
    path: '/success',
    name: '预约成功',
    component: success
  },
  {
    path: '/login',
    name: '请先登录',
    component: login
  },
  {
    path: '/register',
    name: '注册',
    component: register
  },
  {
    path: '/checkMeetingRoom',
    name: '查看会议室',
    component: checkMeetingRoom,
    meta:{
      keepAlive: true
    }
  },
  {
    path:'/changeMeetingRoom',
    name: '编辑会议室',
    component: changeMeetingRoom
  },
  {
    path:'/uploadFile',
    name:'上传文件',
    component: upload
  },
  {
    path:'/record',
    name:'会议记录',
    component: record
  },
  {
    path:'/changeRecord',
    name:'查看会议记录',
    component: changeRecord
  },
  {
    path: '/myMeeting',
    name:'我的会议',
    component: myMeeting
  },
  {
    path:'/notice',
    name:'会议通知',
    component: notice
  },
  {
    path: '/home',
    name:'首页',
    component: home
  },
  {
    path: '/addperson',
    name:'增加会议成员',
    component: addperson
  },
  {
    path:'/profile',
    name:'个人信息',
    component: profile
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//不需要登录也能访问的路由白名单
const whiteList = ['/login', '/home','/register','/addperson']
router.beforeEach ((to, from, next) => {
  if (!whiteList.includes (to.path)) {
    const token = window.localStorage.getItem ("Authorization")
    if (!token || token === "undefined") {
      Vue.prototype.$message.error('请先登录')
      next ({
        path: "/login",
        query:{
          redirect:to.fullPath
        }
      })
    }
  }
    next();
})

export default router
