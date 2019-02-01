import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/config/global',
        name: 'global',
        component: () => import('./components/GlobalConfig.vue')
      },
      {
          path: '/config/token',
          name: 'token',
          component: () => import('./components/TokenConfig.vue')
      }
  ]
})
