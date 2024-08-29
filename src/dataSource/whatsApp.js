/**
 * charLength 字段在表格中长度设置
 * show 该 字段是否在表格中展示
 * label 中文字段
 * prop 表字段
 * queryParameters 是否作为查询条件
 * needDictionary  需要查询字典的 字段; filterable- 是否需要字典下拉项 可搜索匹配
 * addFlg 是否是属于 添加操作 字段
 * type--time, 配置时间控件，initDay: 7 ,时间段 默认近七天
 *
 */

// whatsapp记录
export function getWhatsAppCellData() {
    return [
        { type: 'normal', val: '', label: 'id', prop: 'id' },
        { charLength: 12, type: 'normal', val: '', label: '调用订单号', prop: 'notifyNo', show: true, queryParameters: true },
        { charLength: 12, type: 'normal', val: '', label: '调用手机号', prop: 'number', show: true, queryParameters: true },
        { charLength: 14, type: 'normal', val: '', label: '请求参数', prop: 'requestData', show: true },
        { charLength: 14, type: 'normal', val: '', label: '请求路径', prop: 'requestUrl', show: true },
        { charLength: 10, type: 'normal', val: '', label: '请求时间', prop: 'requestTime', show: true },
        { charLength: 14, type: 'normal', val: '', label: '返回参数', prop: 'responseData', show: true },
        { charLength: 10, type: 'normal', val: '', label: '返回时间', prop: 'responseTime', show: true },
        {
            charLength: 8,
            type: 'boolean',
            val: '',
            label: '是否有效手机号',
            prop: 'validSign',
            show: true,
            queryParameters: true,
            needDictionary: {
                options: [
                    { value: true, label: '是' },
                    { value: false, label: '否' }
                ]
            }
        },
        {
            type: 'boolean',
            val: '',
            label: '是否注册',
            prop: 'onWhatsapp',
            show: true,
            queryParameters: true,
            needDictionary: {
                options: [
                    { value: true, label: '是' },
                    { value: false, label: '否' }
                ]
            }
        },

        { type: 'normal', val: '', label: '备注', prop: 'remark', show: true },
        { charLength: 10, type: 'normal', val: '', label: '创建时间', prop: 'createTime', show: true },
        { charLength: 10, type: 'normal', val: '', label: '更新时间', prop: 'updateTime', show: true },
        { type: 'time', val: '', label: '时间', prop: 'statisticDate', queryParameters: true, startTime: 'startTime', endTime: 'endTime' }
    ]
}

// whatsapp统计
export function getStatisticAppCellData() {
    return [
        { type: 'normal', val: '', label: 'id', prop: 'id' },
        { charLength: 10, type: 'normal', val: '', label: '统计时间', prop: 'statisticDate', show: true },
        { type: 'normal', val: '', label: '调用次数', prop: 'callCount', show: true },
        { type: 'normal', val: '', label: '注册whatsapp数', prop: 'onWhatsappCount', show: true },
        { type: 'normal', val: '', label: '未注册whatsapp数', prop: 'notOnWhatsappCount', show: true },
        { type: 'normal', val: '', label: '注册率', prop: 'onWhatsappRate', show: true },
        { type: 'time', val: '', label: '统计时间', prop: 'statisticDate', queryParameters: true, startTime: 'startTime', endTime: 'endTime', initDay: 7 }
    ]
}
