// 相关字典
export function getDictionary(type) {
    const dictionaryMap = {
        countryCode: '/constant/country/enum', // 国家
        riskResult: '/pp-risk/manage/constant/risk-result/enum', // 风控结果
        riskType: '/constant/risk-type/enum', // 风控类型
        riskOrderStatus: '/constant/risk-order-status/enum', // 风控订单状态
        partner: '/constant/partner/list', // 合作方列表
    }
    const url = dictionaryMap[type]
    return request({
        url: `${BASE_URL}${url}`,
        method: 'post',
        data: {}
    })
}