/**
 * charLength 字段在表格中长度设置
 * show 该 字段是否在表格中展示
 * label 中文字段
 * prop 表字段
 * queryParameters 是否作为查询条件
 * needDictionary  需要查询字典的 字段; filterable- 是否需要字典下拉项 可搜索匹配
 * addFlg 是否是属于 添加操作 字段
 */
export function getRiskCellData() {
    return [
        { type: 'normal', val: '', label: 'id', prop: 'id', },
        { charLength: 12, type: 'normal', val: '', label: '风控订单号', prop: 'taskNo', show: true, queryParameters: true, },
        { charLength: 10, type: 'normal', val: '', label: '申请订单号', prop: 'orderNo', show: true, queryParameters: true, },
        { charLength: 14, type: 'normal', val: '', label: '合作方订单号', prop: 'partnerOrderNo', show: true, queryParameters: true, },
        { charLength: 14, type: 'normal', val: '', label: '合作方名称', prop: 'partnerName', show: true, },
        { type: 'normal', val: '', label: '合作方名称', prop: 'partnerId', queryParameters: true, needDictionary: { code: 'partner', codeName: 'desc', codeValue: 'name', filterable: true } },
        { type: 'normal', val: '', label: '国家代码', prop: 'countryCode', queryParameters: true, needDictionary: { code: 'countryCode', codeName: 'desc', codeValue: 'name', filterable: true }, },

        { type: 'normal', val: '', label: '风控状态', prop: 'status', queryParameters: true, needDictionary: { code: 'riskOrderStatus', codeName: 'desc', codeValue: 'name', } },
        { type: 'normal', val: '', label: '风控结果', prop: 'result', queryParameters: true, needDictionary: { code: 'riskResult', codeName: 'desc', codeValue: 'name', } },
        { charLength: 10, type: 'normal', val: '', label: '手机号', prop: 'phone', queryParameters: true, show: true, },
        { charLength: 10, type: 'normal', val: '', label: '申请时间', prop: 'applyTime', show: true, },
        { type: 'normal', val: '', label: '状态', prop: 'statusStr', show: true, },
        { type: 'normal', val: '', label: '风控结果', prop: 'resultStr', show: true, },
        { type: 'normal', val: '', label: '国家', prop: 'country', show: true, },
        { type: 'normal', val: '', label: '备注', prop: 'remark', show: true, },
        { charLength: 10, type: 'normal', val: '', label: '创建时间', prop: 'createTime', show: true, },
        { charLength: 10, type: 'normal', val: '', label: '更新时间', prop: 'updateTime', show: true, },
        // { type: 'normal', val: '', label: '开始下单时间', prop: 'startApplyDate', queryParameters: true, },
        // { type: 'normal', val: '', label: '结束下单时间', prop: 'endApplyDate', queryParameters: true, },
        // { type: 'normal', val: '', label: '开始创建时间', prop: 'startCreateTime', queryParameters: true, },
        // { type: 'normal', val: '', label: '结束创建时间', prop: 'endCreateTime', queryParameters: true, },
        { type: 'time', val: '', label: '下单时间', prop: 'applyDate', queryParameters: true, startTime: 'startApplyDate', endTime: 'endApplyDate' },
        { type: 'time', val: '', label: '创建时间', prop: 'createTime', queryParameters: true, startTime: 'startCreateTime', endTime: 'endCreateTime' },
    ];
}