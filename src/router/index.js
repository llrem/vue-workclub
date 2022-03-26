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
      redirect: '/project/my-project',
      meta: { title: '项目', icon: 'el-icon-s-help' },
      children: [
        {
          path: 'my-project',
          name: 'my-project',
          component: () => import('@/views/project/myProject/index'),
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
      component: ()=>import('@/views/project/task/index'),
      hidden: true,
      meta: { title: '任务'},
      children: [
        {
          path:'board',
          name:'board',
          component: ()=>import('@/views/project/task/board/index'),
          children: [
            {
              path:'comment',
              name:'comment',
              component: ()=>import('@/views/project/task/board/comment/index'),
            },
            {
              path:'document',
              name:'document',
              component: ()=>import('@/views/project/task/board/document/index'),
            },
            {
              path:'log',
              name:'log',
              component: ()=>import('@/views/project/task/board/log/index'),
            }
          ]
        },
        {
          path:'log',
          name:'log',
          component: ()=>import('@/views/project/task/log/index'),
        },
        {
          path:'member',
          name:'member',
          component: ()=>import('@/views/project/task/member/index'),
        },
        {
          path:'setting',
          name:'setting',
          component: ()=>import('@/views/project/task/setting/index'),
        },
        {
          path:'statistic',
          name:'statistic',
          component: ()=>import('@/views/project/task/statistic/index'),
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
      path: '/mine',
      component: layout,
      name: 'mine',
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
      name: 'setting',
      meta: { title: '设置', icon: 'el-icon-s-tools' },
      children: [
        {
          path: '/setting',
          name: 'setting',
          component: () => import('@/views/setting/test3'),
        }
      ]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]
})
