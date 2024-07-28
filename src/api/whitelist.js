
import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage' // /pp-risk/manage/partner/create

//  分页查询 查询分页查询黑/白名单用户信息
export function queryUserList(params) {
    return request({
        url: `${BASE_URL}/tag-user/page`,
        method: 'post',
        data: params
    })
}

// 黑/白名单导入
export function uploadList(params) {
    return request({
        url: `${BASE_URL}/tag-user/excel/import`,
        method: 'post',
        data: params,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}