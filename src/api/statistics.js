
import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage' // /pp-risk/manage/partner/create

//  分页查询 查询分页查询黑/白名单用户信息
export function queryStatisticsList(params) {
    return request({
        url: `${BASE_URL}/statistic/platform`,
        method: 'post',
        data: params
    })
}