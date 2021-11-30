import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: () => import( '../views/home-page.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import( '../views/search-page.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
