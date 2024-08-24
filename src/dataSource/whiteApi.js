/**
 * charLength 字段在表格中长度设置
 * show 该 字段是否在表格中展示
 * label 中文字段
 * prop 表字段
 * queryParameters 是否作为查询条件
 * needDictionary  需要查询字典的 字段; filterable- 是否需要字典下拉项 可搜索匹配
 * addFlg 是否是属于 添加操作 字段
 */

// 白名单api调用记录
export function getWhiteApiCellData() {
    return [
        { type: 'normal', val: '', label: 'id', prop: 'id' },
        { charLength: 12, type: 'normal', val: '', label: '调用订单号', prop: 'notifyNo', show: true, queryParameters: true },
        { charLength: 12, type: 'normal', val: '', label: '手机号', prop: 'phone', show: true, queryParameters: true },
        { charLength: 14, type: 'normal', val: '', label: '调用国家', prop: 'country', show: true },

        { charLength: 14, type: 'normal', val: '', label: '请求参数', prop: 'requestData', show: true },
        { charLength: 10, type: 'normal', val: '', label: '请求时间', prop: 'requestTime', show: true },
        { charLength: 14, type: 'normal', val: '', label: '请求路径', prop: 'requestUrl', show: true },
        { charLength: 14, type: 'normal', val: '', label: '返回参数', prop: 'responseData', show: true },
        { charLength: 10, type: 'normal', val: '', label: '返回时间', prop: 'responseTime', show: true },
        {
            charLength: 8,
            type: 'boolean',
            val: '',
            label: '调用状态',
            prop: 'notifyStatus',
            show: true,
            queryParameters: true,
            needDictionary: {
                options: [
                    { value: false, label: '调用失败' },
                    { value: true, label: '调用成功' }
                ]
            }
        },
        {
            type: 'boolean',
            val: '',
            label: '调用结果',
            prop: 'result',
            show: true,
            queryParameters: true,
            needDictionary: {
                options: [
                    { value: false, label: '未命中' },
                    { value: true, label: '命中' }
                ]
            }
        },

        { type: 'normal', val: '', label: '备注', prop: 'remark', show: true },
        { charLength: 10, type: 'normal', val: '', label: '创建时间', prop: 'createTime', show: true },
        { charLength: 10, type: 'normal', val: '', label: '更新时间', prop: 'updateTime', show: true },
        { type: 'time', val: '', label: '调用时间', prop: 'statisticDate', queryParameters: true, startTime: 'startTime', endTime: 'endTime' }
    ]
}

// 白名单api调用统计
export function getStatisticWhiteApiCellData() {
    return [
        { type: 'normal', val: '', label: 'id', prop: 'id' },
        { charLength: 10, type: 'normal', val: '', label: '统计时间', prop: 'statisticDate', show: true },
        { type: 'normal', val: '', label: '调用次数', prop: 'callCount', show: true },
        { type: 'normal', val: '', label: '成功数', prop: 'successCount', show: true },
        { type: 'normal', val: '', label: '命中数', prop: 'whiteSignCount', show: true },
        { type: 'normal', val: '', label: '未命中数', prop: 'notWhiteSignCount', show: true },
        { type: 'normal', val: '', label: '命中率', prop: 'whiteRate',  show: true },
        { type: 'time', val: '', label: '统计时间', prop: 'statisticDate', queryParameters: true, startTime: 'startTime', endTime: 'endTime' }
    ]
}
