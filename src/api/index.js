import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage' // /pp-risk/manage/partner/create

//  首页统计图
export function echartOne(params) {
    return request({
        url: `${BASE_URL}/index/one`,
        method: 'post',
        data: params
    })
}
