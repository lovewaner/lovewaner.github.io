// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import Goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'

require('./less/common.less')

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

const router = new VueRouter ({
  routes :[
    { path: '/goods', component : Goods },
    { path: '/ratings', component : ratings },
    { path: '/seller', component : seller }
  ],
  linkActiveClass: 'active'
})

const store = new Vuex.Store({
  state: {
    count:0
  },
  addCartEl:{},
  mutations: {
    increment(state) {
      state.count++
    }
  }
})


/* eslint-disable no-new */
const app=new Vue({
  router,
  store,
  render : h => h(App),
  data: {
    eventHub: new Vue()
  }
}).$mount('#app')

router.push('/goods')

