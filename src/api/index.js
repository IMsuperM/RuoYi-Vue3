import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage' // /pp-risk/manage/partner/create

//  首页折线统计图
export function echartOne(params) {
    return request({
        url: `${BASE_URL}/index/one`,
        method: 'post',
        data: params
    })
}
//  首页柱状统计图
export function echartTwo(params) {
    return request({
        url: `${BASE_URL}/index/two`,
        method: 'post',
        data: params
    })
}
