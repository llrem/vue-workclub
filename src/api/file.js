import request from '@/utils/request'

export function getFiles(params) {
  return request({
    url: '/task/file/get_files',
    method: 'get',
    params:params
  })
}

export function deleteFile(params) {
  return request({
    url: '/task/file/delete_file',
    method: 'get',
    params:params
  })
}

export function addFolder(params) {
  return request({
    url: '/task/file/add_folder',
    method: 'get',
    params:params
  })
}
