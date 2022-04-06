import request from '@/utils/request'

export function getMembers(params) {
  return request({
    url: '/task/member/get_members',
    method: 'get',
    params:params
  })
}
