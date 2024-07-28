
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