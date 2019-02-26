import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user',
      component: () => import('./views/User.vue')
    },
    {
      path: '/list/:emisor',
      name: 'list',
      component: () => import('./views/List.vue')
    },
    {
      path: '/chat/:emisor/:receptor',
      name: 'chat',
      component: () => import('./views/Chat.vue')
    }
  ]
})
