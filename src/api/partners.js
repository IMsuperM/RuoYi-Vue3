
import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage' // /pp-risk/manage/partner/create
// 合作机构  创建合作机构信息
export function createPartner(params) {
    return request({
        url: `${BASE_URL}/partner/create`,
        method: 'post',
        data: params
    })
}

// 合作机构  更新合作机构信息
export function updatePartner(params) {
    return request({
        url: `${BASE_URL}/partner/update`,
        method: 'post',
        data: params
    })
}

// 合作机构  删除合作机构信息
export function deletePartner(params) {
    return request({
        url: `${BASE_URL}/partner/delete`,
        method: 'post',
        data: params
    })
}

// 合作机构 更新合作机构信息状态
export function updatePartnerStatus(params) {
    return request({
        url: `${BASE_URL}/partner/update/status`,
        method: 'post',
        data: params
    })
}

// 合作机构 分页查询合作机构信息
export function queryPartnerList(params) {
    return request({
        url: `${BASE_URL}/partner/page`,
        method: 'post',
        data: params
    })
}

// 合作机构 相关字典
export function getDictionary(type) {
    const dictionaryMap = {
        country: '/pp-risk/manage/constant/country/enum', // 国家
        riskResult: '/pp-risk/manage/constant/risk-result/enum', // 风控结果
        riskType: '/pp-risk/manage/constant/risk-type/enum', // 风控类型
        riskOrderStatus: '/pp-risk/manage/constant/risk-order-status/enum', // 风控订单状态
        partner: '/pp-risk/manage/constant/partner/list', // 合作方列表
    }
    const url = dictionaryMap[type]
    return request({
        url: `${BASE_URL}${url}`,
        method: 'post',
        data: {}
    })
}