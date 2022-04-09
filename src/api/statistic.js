import request from '@/utils/request'

export function getPieData(params) {
  return request({
    url: '/task/statistic/get_pie_data',
    method: 'get',
    params:params
  })
}
export function getCardData(params) {
  return request({
    url: '/task/statistic/get_card_data',
    method: 'get',
    params:params
  })
}
