/**
 * label 中文字段
 * prop 表字段
 * queryParameters 是否作为查询条件
 * needDictionary  需要查询字典的 字段
 */
export function getPartnersCellData() {
    return [
        { type: 'normal', val: '', label: '合作机构代码', prop: 'partnerCode', queryParameters: true, needDictionary: 'partner', options: null },
        { type: 'normal', val: '', label: '合作机构名称', prop: 'partnerName', queryParameters: true, },
        { type: 'normal', val: '', label: '合作方key', prop: 'partnerKey' },
        { type: 'normal', val: '', label: '合作方秘钥', prop: 'partnerSecret' },
        { type: 'normal', val: '', label: '国家', prop: 'country', queryParameters: true, needDictionary: 'country', options: null },
        { type: 'normal', val: '', label: '备注', prop: 'remark' },
        { type: 'normal', val: '', label: '是否启用', prop: 'disabled', queryParameters: true, needDictionary: true, options: [{ value: true, label: '是' }, { value: false, label: '否' }] },
        { type: 'normal', val: '', label: '创建人姓名', prop: 'createUsername' },
        { type: 'normal', val: '', label: '创建时间', prop: 'createTime' },
        { type: 'normal', val: '', label: '更新人姓名', prop: 'updateUsername' },
        { type: 'normal', val: '', label: '更新时间', prop: 'updateTime' }
    ];
}