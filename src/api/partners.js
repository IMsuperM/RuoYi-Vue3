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

// 合作机构 充值
export function recharge(params) {
    return request({
        url: `${BASE_URL}/partner/recharge`,
        method: 'post',
        data: params
    })
}

// 合作机构 获取合作方费用配置
export function feeConfig(params) {
    return request({
        url: `${BASE_URL}/partner/fee-config/get`,
        method: 'post',
        data: params
    })
}

// 合作机构 更新接口调用费用
export function feeConfigUpdate(params) {
    return request({
        url: `${BASE_URL}/partner/fee-config/update`,
        method: 'post',
        data: params
    })
}
