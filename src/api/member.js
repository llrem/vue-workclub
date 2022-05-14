import request from '@/utils/request'

export function getMembers(params) {
  return request({
    url: '/project/member/get_members',
    method: 'get',
    params:params
  })
}

export function setPermission(params) {
  return request({
    url: '/project/member/set_permission',
    method: 'get',
    params:params
  })
}

export function removeMember(params) {
  return request({
    url: '/project/member/remove_member',
    method: 'get',
    params:params
  })
}

export function searchMember(params) {
  return request({
    url: '/project/member/search_member',
    method: 'get',
    params:params
  })
}

export function searchUser(params) {
  return request({
    url: '/project/member/search_user',
    method: 'get',
    params:params
  })
}

export function inviteUser(data) {
  return request({
    url: '/project/member/invite_user',
    method: 'post',
    data:data
  })
}
