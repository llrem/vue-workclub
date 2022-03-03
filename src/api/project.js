import request from '@/utils/request'

export function getProjects(params) {
  return request({
    url: '/project/get_projects',
    method: 'get',
    params:params
  })
}

export function search(params){
  return request({
    url: '/project/search_project',
    method: 'get',
    params:params
  })
}

export function create_project(data) {
  return request({
    url: '/project/create_project',
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
