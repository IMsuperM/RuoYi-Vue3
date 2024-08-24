import useDictStore from '@/store/modules/dict'
import { getDicts } from '@/api/system/dict/data'
import useSelectDictStore from '@/store/modules/selectDictionary'
/**
 * 获取字典数据
 */
export function useDict(...args) {
    const res = ref({})
    return (() => {
        args.forEach((dictType, index) => {
            res.value[dictType] = []
            const dicts = useDictStore().getDict(dictType)
            if (dicts) {
                res.value[dictType] = dicts
            } else {
                getDicts(dictType).then(resp => {
                    res.value[dictType] = resp.data.map(p => ({ label: p.dictLabel, value: p.dictValue, elTagType: p.listClass, elTagClass: p.cssClass }))
                    useDictStore().setDict(dictType, res.value[dictType])
                })
            }
        })
        return toRefs(res.value)
    })()
}

// 下拉项的字典
export const dictionaryMap = {
    countryCode: '/constant/country/enum', // 国家
    riskResult: '/constant/risk-result/enum', // 风控结果
    riskType: '/constant/risk-type/enum', // 风控类型
    riskOrderStatus: '/constant/risk-order-status/enum', // 风控订单状态
    partner: '/constant/partner/list', // 合作方列表
    tag: '/constant/user-tag/enum', // 名单类型
    cardType: '/constant/user-card-type/enum', // 证件类型
    orderStatus: '/constant/loan-order-status/enum', // 订单状态
    notifyType: '/constant/api-service-notify-enum/enum', // 调用类型
    changeType: '/constant/balance-change-type-enum/enum' // 变更类型
}

export function selectDict() {
    // 查询全部字典
    Object.keys(dictionaryMap).forEach( async dictType => {
        // const dicts = useSelectDictStore().getDict(dictType)
        // if (!dicts) {
        //     useSelectDictStore().setDict(dictType)
        // }
        useSelectDictStore().setDict(dictType)
    })
}
