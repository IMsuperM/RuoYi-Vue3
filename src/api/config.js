import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage'

// 相关字典
export function getDictionary(type) {
    const dictionaryMap = {
        countryCode: '/constant/country/enum', // 国家
        riskResult: '/constant/risk-result/enum', // 风控结果
        riskType: '/constant/risk-type/enum', // 风控类型
        riskOrderStatus: '/constant/risk-order-status/enum', // 风控订单状态
        partner: '/constant/partner/list', // 合作方列表
        tag: '/constant/user-tag/enum', // 名单类型
        cardType: '/constant/user-card-type/enum', // 证件类型
        orderStatus: '/constant/loan-order-status/enum', // 订单状态
        notifyType: '/constant/api-service-notify-enum/enum', // 调用类型
    }
    const url = dictionaryMap[type]
    return request({
        url: `${BASE_URL}${url}`,
        method: 'post',
        data: {}
    })
}
