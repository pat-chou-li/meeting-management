import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import VueCropper from 'vue-cropper'
import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.baseURL = 'http://106.14.76.27:39000'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use((config)=>{
  let token = window.localStorage.getItem('Authorization')
  if(token){
    config.headers['token'] = token;
  }
  return config
},(error)=>{
  return Promise.reject(error)
})
Vue.use(VueAxios,axios)
Vue.use(ElementUI);
Vue.use(VueCropper)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
