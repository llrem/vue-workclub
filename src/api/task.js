import request from '@/utils/request'

export function addTask(data) {
  return request({
    url: '/task/add_task',
    method: 'post',
    data:data
  })
}

export function getTasks(params) {
  return request({
    url: '/task/get_tasks',
    method: 'get',
    params:params
  })
}
export function addList(data) {
  return request({
    url: '/task/add_board',
    method: 'post',
    data:data
  })
}

export function getBoards(params) {
  return request({
    url: '/task/get_boards',
    method: 'get',
    params:params,
  })
}

export function deleteBoard(params) {
  return request({
    url: '/task/delete_board',
    method: 'get',
    params:params,
  })
}

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
