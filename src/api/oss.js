import request from '@/utils/request'
export function policy() {
  return request({
    url:'/aliyun/oss/policy',
    method:'get',
  })
}

export function downloadFile(params) {
  return request({
    url:'/aliyun/oss/download',
    method:'get',
    params:params,
    responseType: 'blob'
  })
}

export function deleteFile(params) {
  return request({
    url:'/aliyun/oss/delete',
    method:'get',
    params:params
  })
}
