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
      meta: { title: '工作台', icon: 'el-icon-menu' },
      children: [{
        path: '/dashboard',
        name: 'dashboard',
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
          path: 'my-project',
          name: 'my-project',
          component: () => import('@/views/project/project/index'),
          meta: { title: '我的项目', icon: 'el-icon-s-help' },
        },
        {
          path: 'archived-project',
          name: 'archived-project',
          component: () => import('@/views/project/archivedProject/index'),
          meta: { title: '已归档项目', icon: 'el-icon-s-help' }
        },
      ]
    },
    {
      path:'/task',
      name:'task',
      redirect:'task/board',
      component: ()=>import('@/views/task/index'),
      hidden: true,
      meta: { title: '任务'},
      children: [
        {
          path:'board',
          name:'board',
          component: ()=>import('@/views/task/board/index'),
          children: [
            {
              path:'comment',
              name:'comment',
              component: ()=>import('@/views/task/board/comment/index'),
            },
            {
              path:'document',
              name:'document',
              component: ()=>import('@/views/task/board/file/index'),
            },
            {
              path:'log',
              name:'log',
              component: ()=>import('@/views/task/board/log/index'),
            }
          ]
        },
        {
          path:'file',
          name:'file',
          component: ()=>import('@/views/task/file/index'),
        },
        {
          path:'member',
          name:'member',
          component: ()=>import('@/views/task/member/index'),
        },
        {
          path:'setting',
          name:'setting',
          component: ()=>import('@/views/task/setting/index'),
        },
        {
          path:'statistic',
          name:'statistic',
          component: ()=>import('@/views/task/statistic/index'),
        }
      ]
    },
    {
      path: '/chart',
      component: layout,
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
      path: '/mine',
      component: layout,
      meta: { title: '我的', icon: 'el-icon-user-solid' },
      children: [
        {
          path: '/mine',
          name: 'mine',
          component: () => import('@/views/mine/index'),
        }
      ]
    },
    {
      path: '/setting',
      component: layout,
      hidden: true,
      meta: { title: '设置', icon: 'el-icon-s-tools' },
      children: [
        {
          path: '/setting',
          component: () => import('@/views/setting/index'),
        }
      ]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]
})
