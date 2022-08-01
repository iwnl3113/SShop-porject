import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 引入store对象
import store from '../store/index.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component:()=>import("../views/HomeView.vue"),
    redirect:"/index",
    children:[
      {
        path: '/index',
        name: 'index',
        component:()=>import("../views/index.vue")
      },
      {
        path: '/usersList',
        name: 'usersList',
        component:()=>import("../views/usersList.vue")
      },
      {
        path: '/rolesList',
        name: 'rolesList',
        component:()=>import("../views/rolesList.vue")
      },
      {
        path: '/goodsList',
        name: 'goodsList',
        component:()=>import("../views/goodsList.vue")
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import("../views/login.vue")
  },
]
// 生成hash路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,form,next)=>{
  /* 
  to:从哪个页面
  from:到哪个页面
  next:只有执行next页面才会进行跳转
  */
 //判断用户是否登录


/* 
  uInfo：

  state:{
        userInfo(state,Info){
            state.userInfo = Info;
        }
    }
}
*/

 const uInfo = store.state.userInfo.userInfo
 console.log(uInfo);
 if(!uInfo){
  // 未登录,跳转到login
  if(to.path==="/login"){
    next()
    return
  }
  next("/login")
  console.log('返回登录页面');
 }else{
   next()
 }
})

export default router
