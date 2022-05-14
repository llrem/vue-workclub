import request from '@/utils/request'

export function getFiles(params) {
  return request({
    url: '/project/file/get_files',
    method: 'get',
    params:params
  })
}

export function deleteFile(params) {
  return request({
    url: '/project/file/delete_file',
    method: 'get',
    params:params
  })
}

export function deleteFolder(params) {
  return request({
    url: '/project/file/delete_folder',
    method: 'get',
    params:params
  })
}

export function addFolder(params) {
  return request({
    url: '/project/file/add_folder',
    method: 'get',
    params:params
  })
}
