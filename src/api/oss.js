import request from '@/utils/request'
export function policy() {
  return request({
    url:'/aliyun/oss/policy',
    method:'get',
  })
}

export function deleteFile(params) {
  return request({
    url:'/aliyun/oss/delete',
    method:'get',
    params:params
  })
}
