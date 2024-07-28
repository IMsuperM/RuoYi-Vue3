/**
 * charLength 表格字段长度
 * show 该 字段是否在表格中展示
 * label 中文字段
 * prop 表字段
 * queryParameters 是否作为查询条件
 * needDictionary  需要查询字典的 字段; filterable- 是否需要字典下拉项 可搜索匹配
 * addFlg 是否是属于 添加操作 字段
 */
// 借款订单
export function getOrderCellData() {
    return [
        { charLength: 3, type: 'normal', val: '', label: 'id', prop: 'id', show: true, },
        { type: 'normal', val: '', label: '订单号', prop: 'orderNo', show: true, queryParameters: true, },
        { charLength: 10,type: 'normal', val: '', label: '合作方订单号', prop: 'partnerOrderNo', show: true, queryParameters: true, },
        { charLength: 10,type: 'normal', val: '', label: '身份证号码', prop: 'cardNo', show: true, queryParameters: true, },
        { type: 'normal', val: '', label: '用户姓名', prop: 'userName', show: true, },
        { charLength: 7,type: 'normal', val: '', label: '手机号', prop: 'phone', show: true, queryParameters: true, },
        { charLength: 10,type: 'normal', val: '', label: '申请时间', prop: 'applyTime', show: true, },
        { type: 'normal', val: '', label: '状态', prop: 'statusStr', show: true, },
        { charLength: 8,type: 'normal', val: '', label: '合作方名称', prop: 'partnerName', show: true, },
        { type: 'normal', val: '', label: '国家', prop: 'country', show: true, },
        { charLength: 7,type: 'normal', val: '', label: '合作方app名称', prop: 'partnerAppName', show: true, queryParameters: true, },
        { charLength: 7,type: 'normal', val: '', label: '合作方产品名称', prop: 'partnerProductName', show: true, },
        { type: 'normal', val: '', label: '借款金额', prop: 'loanAmount', show: true, },
        { type: 'normal', val: '', label: '应还金额', prop: 'repayAmount', show: true, },
        { type: 'normal', val: '', label: '借款周期', prop: 'timeLimit', show: true, },
        { type: 'normal', val: '', label: '应还日期', prop: 'repayTime', show: true, },
        { type: 'normal', val: '', label: '期数', prop: 'planNum', show: true, },
        { charLength: 8,type: 'normal', val: '', label: '合作方用户类型', prop: 'partnerUserTypeStr', show: true, },
        { type: 'normal', val: '', label: '名单类型', prop: 'partnerUserTagStr', show: true, },
        { charLength: 9,type: 'normal', val: '', label: '系统名单类型', prop: 'userTagStr', show: true, },
        { charLength: 10,type: 'normal', val: '', label: '订单创建时间', prop: 'createTime', show: true, },
        { charLength: 10,type: 'normal', val: '', label: '订单更新时间', prop: 'updateTime', show: true, },

        { type: 'normal', val: '', label: '用户标签', prop: 'userTag', queryParameters: true, },
        { type: 'normal', val: '', label: '合作方用户标签', prop: 'partnerUserType', queryParameters: true, },
        { type: 'normal', val: '', label: '合作方名称', prop: 'partnerId', queryParameters: true, needDictionary: { code: 'partner', codeName: 'desc', codeValue: 'name', filterable: true } },
        { type: 'normal', val: '', label: '国家代码', prop: 'countryCode', queryParameters: true, needDictionary: { code: 'countryCode', codeName: 'desc', codeValue: 'name', filterable: true }, },
        { type: 'normal', val: '', label: '状态', prop: 'stauts', queryParameters: true, needDictionary: { code: 'orderStatus', codeName: 'desc', codeValue: 'name', } },
        { type: 'time', val: '', label: '下单时间', prop: 'applyDate', queryParameters: true, startTime: 'startApplyDate', endTime: 'endApplyDate' },
        { type: 'time', val: '', label: '还款时间', prop: 'repayDate', queryParameters: true, startTime: 'startRepayDate', endTime: 'endRepayDate' },
        { type: 'time', val: '', label: '创建时间', prop: 'createTime', queryParameters: true, startTime: 'startCreateTime', endTime: 'endCreateTime' },
    ];
}