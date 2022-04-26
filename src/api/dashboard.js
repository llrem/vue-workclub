import request from '@/utils/request'

export function getTasksByUserId(params) {
  return request({
    url: '/dashboard/get_tasks',
    method: 'get',
    params:params
  })
}

export function getEventDates(params) {
  return request({
    url: '/dashboard/get_event_dates',
    method: 'get',
    params:params
  })
}

export function getEvents(params) {
  return request({
    url: '/dashboard/get_events',
    method: 'get',
    params:params
  })
}
