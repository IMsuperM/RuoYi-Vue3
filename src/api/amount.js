import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage'

//  分页查询 余额变更记录
export function queryAmountList(params) {
    return request({
        url: `${BASE_URL}/balance/log/page`,
        method: 'post',
        data: params
    })
}
