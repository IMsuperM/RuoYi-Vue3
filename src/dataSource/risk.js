/**
 * show 该 字段是否在表格中展示
 * label 中文字段
 * prop 表字段
 * queryParameters 是否作为查询条件
 * needDictionary  需要查询字典的 字段; filterable- 是否需要字典下拉项 可搜索匹配
 * addFlg 是否是属于 添加操作 字段
 */
export function getRiskCellData() {
    return [
        { type: 'normal', val: '', label: 'id', prop: 'id', show: true,},
        { type: 'normal', val: '', label: '风控订单号', prop: 'taskNo', show: true, queryParameters: true, },
        { type: 'normal', val: '', label: '申请订单号', prop: 'orderNo', show: true, queryParameters: true, },
        { type: 'normal', val: '', label: '合作方订单号', prop: 'partnerOrderNo', show: true, queryParameters: true, },
        { type: 'normal', val: '', label: '合作方名称', prop: 'partnerName', show: true, },
        { type: 'normal', val: '', label: '合作方id', prop: 'partnerId', queryParameters: true, },
        { type: 'normal', val: '', label: '国家代码', prop: 'countryCode', queryParameters: true,  needDictionary: { code: 'countryCode', codeName: 'desc', codeValue: 'name', filterable: true }, options: null },
        { type: 'normal', val: '', label: '手机号', prop: 'phone', queryParameters: true, },
        { type: 'normal', val: '', label: '开始下单时间', prop: 'startApplyDate', queryParameters: true, },
        { type: 'normal', val: '', label: '结束下单时间', prop: 'endApplyDate', queryParameters: true, },
        { type: 'normal', val: '', label: '开始创建时间', prop: 'startCreateTime', queryParameters: true, },
        { type: 'normal', val: '', label: '结束创建时间', prop: 'endCreateTime', queryParameters: true, },
        { type: 'normal', val: '', label: '风控状态', prop: 'status', queryParameters: true,  needDictionary: { options: [{ value: 'AUDITING', label: '审核中' }, { value: 'SUCCESS', label: '审核成功' }] }, },
        { type: 'normal', val: '', label: '风控结果', prop: 'result', queryParameters: true,  needDictionary: { options: [{ value: 'APPROVE', label: '通过' }, { value: 'MANUAL', label: '人审' }, { value: 'REJECT', label: '拒绝' }] }, },
        { type: 'normal', val: '', label: '手机号', prop: 'phone', queryParameters: true, show: true, },
        { type: 'normal', val: '', label: '申请时间', prop: 'applyTime', show: true, },
        { type: 'normal', val: '', label: '状态', prop: 'statusStr', show: true,  },
        { type: 'switch', val: '', label: '风控结果', prop: 'resultStr', show: true, },
        { type: 'normal', val: '', label: '国家', prop: 'country', show: true, },
        { type: 'normal', val: '', label: '备注', prop: 'remark', show: true, },
        { type: 'normal', val: '', label: '是否启用', prop: 'disabled', show: true, },
        { type: 'normal', val: '', label: '创建时间', prop: 'createTime', show: true, },
        { type: 'normal', val: '', label: '更新时间', prop: 'updateTime', show: true, }
    ];
}


// startApplyDate 	否 	string 	开始下单时间
// endApplyDate 	否 	string 	结束下单时间
// startCreateTime 	否 	string 	开始创建时间
// endCreateTime 	否 	string 	结束创建时间

// id 	long 	id
// taskNo 	string 	风控订单号
// orderNo 	string 	申请订单号
// partnerOrderNo 	string 	合作方订单号
// partnerName 	string 	合作方名称
// phone 	string 	手机号
// applyTime 	string 	申请时间
// statusStr 	string 	状态
// resultStr 	string 	风控结果
// country 	string 	国家
// remark 	string 	备注
// disabled 	boolean 	0-禁用 1-启用
// createTime 	string 	创建时间
// updateTime 	string 	更新时间