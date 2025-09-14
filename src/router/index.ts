/* 创建一个路由器，并暴露出去 */
// 第一步：引入createRouter
import { createRouter, createWebHistory } from "vue-router";
// 第二步：引入要用的组件
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import News from "@/pages/News.vue";
const Detail = () => import('@/pages/Detail.vue')
const Detail1 = () => import('@/pages/Detail1.vue')


// 第三步：创建路由器
const router = createRouter({
  history: createWebHistory(), // 路由器的工作模式
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/news',
      component: News,
      children: [
        {
          name: 'detail',
          path: 'detail/:id(\\d+)',
          component: Detail,
          props: (route) => ({id: Number(route.params.id)})
        },
        {
          name: 'detailByTitle',
          path: 'detail/:title',
          component: Detail,
          props: true
        },
      ]
    },
  ]
})
// 暴露出去router
export default router