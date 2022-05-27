import request from '@/utils/request'

export function getPieData(params) {
  return request({
    url: '/project/statistic/get_pie_data',
    method: 'get',
    params:params
  })
}
export function getCardData(params) {
  return request({
    url: '/project/statistic/get_card_data',
    method: 'get',
    params:params
  })
}

export function getTopology(params) {
  return request({
    url: '/project/statistic/get_topology',
    method: 'get',
    params:params
  })
}

export function getLineData(params) {
  return request({
    url: '/project/statistic/get_line_data',
    method: 'get',
    params:params
  })
}
