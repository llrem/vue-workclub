import request from '@/utils/request'

export function addTask(data) {
  return request({
    url: '/project/board/add_task',
    method: 'post',
    data:data
  })
}

export function getTasks(params) {
  return request({
    url: '/project/board/get_tasks',
    method: 'get',
    params:params
  })
}
export function addList(data) {
  return request({
    url: '/project/board/add_board',
    method: 'post',
    data:data
  })
}

export function getBoards(params) {
  return request({
    url: '/project/board/get_boards',
    method: 'get',
    params:params,
  })
}

export function deleteBoard(params) {
  return request({
    url: '/project/board/delete_board',
    method: 'get',
    params:params,
  })
}

export function boardRename(params) {
  return request({
    url: '/project/board/board_rename',
    method: 'get',
    params:params,
  })
}
