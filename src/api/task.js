import request from '@/utils/request'

export function getTaskInfo(params) {
  return request({
    url: '/task/get_task_info',
    method: 'get',
    params:params,
  })
}

export function changeTaskStatus(params) {
  return request({
    url: '/task/change_task_status',
    method: 'get',
    params:params,
  })
}

export function changeTaskPriority(params) {
  return request({
    url: '/task/change_task_priority',
    method: 'get',
    params:params,
  })
}

export function changeTaskType(params) {
  return request({
    url: '/task/change_task_type',
    method: 'get',
    params:params,
  })
}

export function changeStartDate(data) {
  return request({
    url: '/task/change_start_date',
    method: 'post',
    data:data,
  })
}

export function changeDueDate(data) {
  return request({
    url: '/task/change_due_date',
    method: 'post',
    data:data,
  })
}

export function addTag(data) {
  return request({
    url: '/task/add_tag',
    method: 'post',
    data:data,
  })
}

export function deleteTag(data) {
  return request({
    url: '/task/delete_tag',
    method: 'post',
    data:data,
  })
}

export function selectExecutor(params) {
  return request({
    url: '/task/select_executor',
    method: 'get',
    params:params,
  })
}

export function selectFollower(params) {
  return request({
    url: '/task/select_follower',
    method: 'get',
    params:params,
  })
}

export function removeExecutor(params) {
  return request({
    url: '/task/remove_executor',
    method: 'get',
    params:params,
  })
}


export function changeDescription(params) {
  return request({
    url: '/task/change_description',
    method: 'get',
    params:params,
  })
}

export function getComments(params) {
  return request({
    url: '/task/get_comments',
    method: 'get',
    params:params,
  })
}

export function submitComments(data) {
  return request({
    url: '/task/submit_comments',
    method: 'post',
    data:data,
  })
}

export function getFiles(params) {
  return request({
    url: '/task/get_files',
    method: 'get',
    params:params,
  })
}

export function addFile(data) {
  return request({
    url: '/task/add_file',
    method: 'post',
    data:data,
  })
}

export function addLog(data) {
  return request({
    url: '/task/add_log',
    method: 'post',
    data:data,
  })
}


export function getLogList(params) {
  return request({
    url: '/task/get_logList',
    method: 'get',
    params:params,
  })
}

export function deleteTask(params) {
  return request({
    url: '/task/delete_task',
    method: 'get',
    params:params,
  })
}

export function searchTask(params) {
  return request({
    url: '/task/search_task',
    method: 'get',
    params:params,
  })
}

export function publishSubTask(data) {
  return request({
    url: '/task/publish_sub_task',
    method: 'post',
    data:data,
  })
}

export function getSubTasks(params) {
  return request({
    url: '/task/get_sub_tasks',
    method: 'get',
    params:params,
  })
}

export function deleteSubTask(params) {
  return request({
    url: '/task/delete_sub_task',
    method: 'get',
    params:params,
  })
}

export function getHeadTasks(params) {
  return request({
    url: '/task/get_head_tasks',
    method: 'get',
    params:params,
  })
}
export function addHeadTask(params) {
  return request({
    url: '/task/add_head_task',
    method: 'get',
    params:params,
  })
}

export function removeHeadTask(data) {
  return request({
    url: '/task/remove_head_task',
    method: 'post',
    data:data,
  })
}
