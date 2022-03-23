import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'get',
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function saveInfo(data) {
  return request({
    url: '/user/saveInfo',
    method: 'post',
    data
  })
}

export function saveAvatar(data) {
  return request({
    url: '/user/saveAvatar',
    method: 'post',
    data
  })
}
