import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage' // /pp-risk/manage/partner/create

export function list() {
    return request({
        url: `/mock/list`,
        method: 'post'
    })
}

//  分页查询 查询风控订单信息
export function queryRiskList(params) {
    return request({
        url: `${BASE_URL}/risk/order/page`,
        method: 'post',
        data: params
    })
}
