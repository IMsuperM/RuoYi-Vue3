/**
 * show 该 字段是否在表格中展示
 * label 中文字段
 * prop 表字段
 * queryParameters 是否作为查询条件
 * needDictionary  需要查询字典的 字段; filterable- 是否需要字典下拉项 可搜索匹配
 * addFlg 是否是属于 添加操作 字段
 */

//  黑白名单
export function getStatisticsCellData() {
    return [
        { type: 'normal', val: '', label: '统计日期', prop: 'statisticDate', show: true, },
        { type: 'normal', val: '', label: '风控调用量', prop: 'riskCallNum', show: true, },
        { type: 'normal', val: '', label: '申请订单数', prop: 'applyNum', show: true, },
        { type: 'normal', val: '', label: '拒绝订单数', prop: 'rejectNum', show: true, },
        { type: 'normal', val: '', label: '审核中订单数', prop: 'auditingNum', show: true, },
        { type: 'normal', val: '', label: '通过订单数', prop: 'approveNum', show: true, },
        { type: 'normal', val: '', label: '通过率', prop: 'approveRate', show: true, },
        { type: 'normal', val: '', label: '放款成功订单数', prop: 'loanSuccessNum', show: true, },
        { type: 'normal', val: '', label: '放款率', prop: 'loanSuccessRate', show: true, },
        { type: 'normal', val: '', label: '应还订单数', prop: 'repayNum', show: true, },
        { type: 'normal', val: '', label: '结清订单数', prop: 'settingNum', show: true, },
        { type: 'normal', val: '', label: '首逾订单数', prop: 'firstOverdueNum', show: true, },
        { type: 'normal', val: '', label: '首逾率', prop: 'firstOverdueRate', show: true, },
        { type: 'normal', val: '', label: '逾期订单数', prop: 'overdueNum', show: true, },
        { type: 'normal', val: '', label: '逾期率', prop: 'overdueRate', show: true, },

        { type: 'normal', val: [], label: '合作方名称', prop: 'partnerIdList', queryParameters: true, needDictionary: { code: 'partner', codeName: 'desc', codeValue: 'name', filterable: true, multipleSelcet: true, } },
        { type: 'normal', val: '', label: '国家代码', prop: 'countryCode', queryParameters: true, needDictionary: { code: 'countryCode', codeName: 'desc', codeValue: 'name', filterable: true }, },
        { type: 'normal', val: '', label: '合作方app名称', prop: 'partnerAppName', queryParameters: true, },
        { type: 'normal', val: '', label: '合作方产品名称', prop: 'partnerProductName', queryParameters: true, },
        { type: 'normal', val: '', label: '合作方用户类型', prop: 'partnerUserType', queryParameters: true, needDictionary: { options: [{ value: 'NEW', label: '新客' }, { value: 'OLD', label: '老客' }] }, },
        { type: 'normal', val: '', label: '用户名单类型', prop: 'tag', queryParameters: true, needDictionary: { code: 'tag', codeName: 'desc', codeValue: 'name' }, },
        { type: 'time', val: '', label: '创建时间', prop: 'statisticDate', queryParameters: true, startTime: 'startStatisticDate', endTime: 'endStatisticDate' },
    ];
}