import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage'

//  分页查询 调用whatsapp记录
export function queryWhatsappList(params) {
    return request({
        url: `${BASE_URL}/whatsapp/api/page`,
        method: 'post',
        data: params
    })
}

//  调用whatsapp调用统计
export function queryWhatsappStatistic(params) {
    return request({
        url: `${BASE_URL}/whatsapp/api/statistic`,
        method: 'post',
        data: params
    })
}
