import request from '@/utils/request'

export function getProjects(params) {
  return request({
    url: '/project/get_projects',
    method: 'get',
    params:params
  })
}

export function getProject(params) {
  return request({
    url: '/project/get_project',
    method: 'get',
    params:params
  })
}

export function searchProject(params){
  return request({
    url: '/project/search_project',
    method: 'get',
    params:params
  })
}

export function createProject(data) {
  return request({
    url: '/project/create_project',
    method: 'post',
    data:data
  })
}

export function getProjectMembers(params) {
  return request({
    url: '/project/get_project_members',
    method: 'get',
    params:params
  })
}

export function updateCover(data) {
  return request({
    url: '/project/update_cover',
    method: 'post',
    data:data
  })
}

export function updateName(data) {
  return request({
    url: '/project/update_name',
    method: 'post',
    data:data
  })
}

export function updateDescription(data) {
  return request({
    url: '/project/update_description',
    method: 'post',
    data:data
  })
}

export function archiveProject(params) {
  return request({
    url: '/project/archive_project',
    method: 'get',
    params:params
  })
}

export function deleteProject(params) {
  return request({
    url: '/project/delete_project',
    method: 'get',
    params:params
  })
}

export function search(params) {
  return request({
    url: '/project/search',
    method: 'get',
    params:params
  })
}

export function joinProject(data) {
  return request({
    url: '/project/join_project',
    method: 'post',
    data:data
  })
}

// 上传图片至本地
// export function uploadImg(data,username) {
//   const formData = new FormData()
//   formData.append('file', data.file)
//   formData.append('username',username)
//   return request({
//     url: '/project/upload_cover',
//     method: 'post',
//     data: formData,
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   })
// }
