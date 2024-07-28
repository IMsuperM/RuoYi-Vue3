
import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage' // /pp-risk/manage/partner/create

//  分页查询借款订单信息
export function queryOrderList(params) {
    return request({
        url: `${BASE_URL}/risk/order/page`,
        method: 'post',
        data: params
    })
}
