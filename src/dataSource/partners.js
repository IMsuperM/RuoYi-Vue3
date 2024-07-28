/**
 * charLength 字段在表格中长度设置
 * show 该 字段是否在表格中展示
 * label 中文字段
 * prop 表字段
 * queryParameters 是否作为查询条件
 * needDictionary  需要查询字典的 字段; filterable- 是否需要字典下拉项 可搜索匹配
 * addFlg 是否是属于 添加操作 字段
 */
export function getPartnersCellData() {
    return [
        { type: 'normal', val: '', label: 'id', prop: 'id' },
        { charLength: 12, type: 'normal', val: '', label: '合作方编码', prop: 'partnerCode', show: true, queryParameters: true, addFlg: true },
        { charLength: 8, type: 'normal', val: '', label: '合作方名称', prop: 'partnerName', show: true, queryParameters: true, addFlg: true },
        { charLength: 12, type: 'normal', val: '', label: '合作方key', prop: 'partnerKey', show: true, },
        { charLength: 12, type: 'normal', val: '', label: '合作方秘钥', prop: 'partnerSecret', show: true, },
        { type: 'normal', val: '', label: '国家代码', prop: 'countryCode', queryParameters: true, addFlg: true, needDictionary: { code: 'countryCode', codeName: 'desc', codeValue: 'name', filterable: true } },
        { type: 'normal', val: '', label: '国家', prop: 'country', show: true, },
        { charLength: 8, type: 'normal', val: '', label: '备注', prop: 'remark', show: true, addFlg: true, },
        { type: 'switch', val: '', label: '是否启用', prop: 'disabled', show: true, queryParameters: true, needDictionary: true, needDictionary: { options: [{ value: true, label: '是' }, { value: false, label: '否' }] }, },
        { type: 'normal', val: '', label: '创建人姓名', prop: 'createUsername', show: true, },
        { charLength: 8, type: 'normal', val: '', label: '创建时间', prop: 'createTime', show: true, },
        { type: 'normal', val: '', label: '更新人姓名', prop: 'updateUsername', show: true, },
        { charLength: 8, type: 'normal', val: '', label: '更新时间', prop: 'updateTime', show: true, }
    ];
}