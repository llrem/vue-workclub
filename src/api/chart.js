import request from '@/utils/request'

export function getProjectsData(params) {
  return request({
    url: '/project/statistic/get_projects_data',
    method: 'get',
    params:params
  })
}

export function getTasksData(params) {
  return request({
    url: '/project/statistic/get_tasks_data',
    method: 'get',
    params:params
  })
}
