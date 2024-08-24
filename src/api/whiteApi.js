import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage'

//  分页查询 白名单api调用记录
export function queryWhiteApiList(params) {
    return request({
        url: `${BASE_URL}/api/white/page`,
        method: 'post',
        data: params
    })
}

//  白名单api调用统计
export function queryWhiteApiStatistic(params) {
    return request({
        url: `${BASE_URL}/api/white/statistic`,
        method: 'post',
        data: params
    })
}
