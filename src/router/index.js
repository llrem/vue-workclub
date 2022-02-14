import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },

    {
      path: '/',
      redirect: '/dashboard',
      hidden: true
    },

    {
      path: '/dashboard',
      component: layout,
      name: 'dashboard',
      meta: { title: 'Dashboard', icon: 'el-icon-menu' },
      children: [{
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
      }]
    },

    {
      path: '/chart',
      component: layout,
      name: 'chart',
      meta: { title: 'Chart', icon: 'el-icon-s-data' },
      children: [
        {
          path: '/chart',
          name: 'Form',
          component: () => import('@/views/chart/index'),
        }
      ]
    },

    {
      path: '/project',
      component: layout,
      name: 'project',
      meta: { title: 'project', icon: 'el-icon-s-help' },
      children: [
        {
          path: 'menu1',
          name: 'menu1',
          component: () => import('@/views/project/menu1/index'),
          meta: { title: 'menu1', icon: 'el-icon-s-help' },
        },
        {
          path: 'menu2',
          name: 'menu2',
          component: () => import('@/views/project/menu2/index'),
          meta: { title: 'menu2', icon: 'el-icon-s-help' },
        }
      ]
    }
  ]
})
