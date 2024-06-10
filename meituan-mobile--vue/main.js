import './assets/main.css'
import './assets/icon/iconfont.css'
import './assets/swiper/swiper.min.css'
import './assets/swiper/swiper.min.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vant from 'vant';
import 'vant/lib/index.css';
import * as echarts from 'echarts';  
import '@vant/touch-emulator';

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(Vant);
app.config.globalProperties.$axios = axios
app.provide('$axios', axios)
app.provide('echarts',echarts)


app.mount('#app')
// 0103 苗桐菲 2024--5-14
// 使用钩子函数实现路由权限控制
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
      if(localStorage.getItem('token')){
         console.log(localStorage.getItem('token'))
        next();
      }else {
       if(to.path === '/login'){
          next();
        }else {
          alert('请先进行登录！')
          next({
            path:'/login'
          })
        }
      }
    }
    else {
      next();
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if(to.fullPath == "/login"){
      if(localStorage.getItem('token')){
        alert('您已经登录了，如果想要登录其他账号，请先退出当前账号！')
        next({
          path:'/'
        });
      }else {
        next();
      }
    }
  });
  
  