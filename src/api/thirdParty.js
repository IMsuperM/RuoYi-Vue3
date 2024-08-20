import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage'

//  分页查询 调用whatsapp记录
export function queryThirdPartyList(params) {
    return request({
        url: `${BASE_URL}/api/notify/page`,
        method: 'post',
        data: params
    })
}

//  三方平台调用统计
export function queryThirdStatistic(params) {
    return request({
        url: `${BASE_URL}/api/notify/statistic`,
        method: 'post',
        data: params
    })
}
