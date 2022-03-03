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
      path: '/404',
      component: () => import('@/views/404'),
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
      meta: { title: '工作台', icon: 'el-icon-menu' },
      children: [{
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
      }]
    },

    {
      path: '/project',
      component: layout,
      name: 'project',
      meta: { title: '项目', icon: 'el-icon-s-help' },
      children: [
        {
          path: '/my-project',
          name: 'my-project',
          component: () => import('@/views/project/myProject/index'),
          meta: { title: '我的项目', icon: 'el-icon-s-help' },
        },
        {
          path: '/archived-project',
          name: 'archived-project',
          component: () => import('@/views/project/archivedProject/index'),
          meta: { title: '已归档项目', icon: 'el-icon-s-help' }
        }
      ]
    },

    {
      path: '/notice',
      component: layout,
      name: 'notice',
      meta: { title: '消息', icon: 'el-icon-s-comment' },
      children: [
        {
          path: '/notice',
          name: 'notice',
          component: () => import('@/views/notice/index'),
        }
      ]
    },

    {
      path: '/document',
      component: layout,
      name: 'document',
      meta: { title: '文件', icon: 'el-icon-s-order' },
      children: [
        {
          path: '/document',
          name: 'document',
          component: () => import('@/views/document/index'),
        }
      ]
    },

    {
      path: '/chart',
      component: layout,
      name: 'chart',
      meta: { title: '数据图表', icon: 'el-icon-s-data' },
      children: [
        {
          path: '/chart',
          name: 'chart',
          component: () => import('@/views/chart/index'),
        }
      ]
    },

    {
      path: '/setting',
      component: layout,
      name: 'setting',
      meta: { title: '设置', icon: 'el-icon-s-tools' },
      children: [
        {
          path: '/setting',
          name: 'setting',
          component: () => import('@/views/setting/index'),
        }
      ]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]
})
