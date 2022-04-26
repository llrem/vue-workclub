import request from '@/utils/request'

export function getMembers(params) {
  return request({
    url: '/task/member/get_members',
    method: 'get',
    params:params
  })
}

export function setPermission(params) {
  return request({
    url: '/task/member/set_permission',
    method: 'get',
    params:params
  })
}

export function removeMember(params) {
  return request({
    url: '/task/member/remove_member',
    method: 'get',
    params:params
  })
}

export function searchMember(params) {
  return request({
    url: '/task/member/search_member',
    method: 'get',
    params:params
  })
}

export function searchUser(params) {
  return request({
    url: '/task/member/search_user',
    method: 'get',
    params:params
  })
}

export function inviteUser(data) {
  return request({
    url: '/task/member/invite_user',
    method: 'post',
    data:data
  })
}
