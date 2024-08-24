import request from '@/utils/request'
import { dictionaryMap } from '@/utils/dict'
const BASE_URL = '/pp-risk/manage'

// 相关字典
export function getDictionary(type) {
    const url = dictionaryMap[type]
    return request({
        url: `${BASE_URL}${url}`,
        method: 'post',
        data: {}
    })
}
