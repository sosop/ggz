import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/globalConfig',
      name: 'globalConfig',
      component: () => import('./components/GlobalConfig.vue')
    }
  ]
})
