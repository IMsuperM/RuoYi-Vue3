/**
 * show 该 字段是否在表格中展示
 * label 中文字段
 * prop 表字段
 * queryParameters 是否作为查询条件
 * needDictionary  需要查询字典的 字段; filterable- 是否需要字典下拉项 可搜索匹配
 * addFlg 是否是属于 添加操作 字段
 */

//  黑白名单
export function getUserCellData() {
    return [
        { type: 'normal', val: '', label: 'id', prop: 'id', show: true,},
        { type: 'normal', val: '', label: '证件类型', prop: 'cardTypeStr', show: true, },
        { type: 'normal', val: '', label: '国家', prop: 'country', show: true, },
        { type: 'normal', val: '', label: '证件号', prop: 'cardNo', show: true,},
        { type: 'normal', val: '', label: '名单类型', prop: 'tagStr', show: true, },
        { type: 'normal', val: '', label: '名单来源', prop: 'sourceStr', show: true, },
        { type: 'normal', val: '', label: '名单类型', prop: 'tag', queryParameters: true,  needDictionary: { code: 'tag', codeName: 'desc', codeValue: 'name', value:'' }, },
        { type: 'normal', val: '', label: '证件类型', prop: 'cardType', queryParameters: true,  needDictionary: { code: 'cardType', codeName: 'desc', codeValue: 'name' }, },
        { type: 'normal', val: '', label: '国家代码', prop: 'countryCode', queryParameters: true,  needDictionary: { code: 'countryCode', codeName: 'desc', codeValue: 'name', filterable: true }, },
        { type: 'normal', val: '', label: '来源', prop: 'source', queryParameters: true,  needDictionary: { options: [{ value: 'SYSTEM', label: '系统生成' }, { value: 'MANUAL', label: '手动导入' }]}, },
        { type: 'normal', val: '', label: '备注', prop: 'remark', show: true, queryParameters: true, },
        { type: 'time', val: '', label: '创建时间', prop: 'createTime', queryParameters: true, startTime:'startCreateDate', endTime:'endCreateDate' },
        { type: 'normal', val: '', label: '有效期', prop: 'validityTime',show: true, },
        { type: 'normal', val: '', label: '创建时间', prop: 'createTime', show: true,},
        { type: 'normal', val: '', label: '更新时间', prop: 'updateTime', show: true, },
    ];
}

export function getWhitelistCellData() {
    return [
        { charLength: 4,type: 'normal', val: '', label: 'id', prop: 'id', show: true,},
        { type: 'normal', val: '', label: '证件类型', prop: 'cardTypeStr', show: true, },
        { type: 'normal', val: '', label: '国家', prop: 'country', show: true, },
        { type: 'normal', val: '', label: '证件号', prop: 'cardNo', show: true,},
        { type: 'normal', val: '', label: '名单类型', prop: 'tagStr', show: true, },
        { type: 'normal', val: '', label: '名单来源', prop: 'sourceStr', show: true, },
        { type: 'normal', val: '', label: '名单类型', prop: 'tag', queryParameters: true,  needDictionary: { code: 'tag', codeName: 'desc', codeValue: 'name', label:'白名单' }, },
        { type: 'normal', val: '', label: '证件类型', prop: 'cardType', queryParameters: true,  needDictionary: { code: 'cardType', codeName: 'desc', codeValue: 'name' }, },
        { type: 'normal', val: '', label: '国家代码', prop: 'countryCode', queryParameters: true,  needDictionary: { code: 'countryCode', codeName: 'desc', codeValue: 'name', filterable: true }, },
        { type: 'normal', val: '', label: '来源', prop: 'source', queryParameters: true,  needDictionary: { options: [{ value: 'SYSTEM', label: '系统生成' }, { value: 'MANUAL', label: '手动导入' }]}, },
        { type: 'normal', val: '', label: '备注', prop: 'remark', show: true, queryParameters: true, },
        { type: 'time', val: '', label: '创建时间', prop: 'createTime', queryParameters: true, startTime:'startCreateDate', endTime:'endCreateDate' },
        { type: 'normal', val: '', label: '有效期', prop: 'validityTime',show: true, },
        { type: 'normal', val: '', label: '创建时间', prop: 'createTime', show: true,},
        { type: 'normal', val: '', label: '更新时间', prop: 'updateTime', show: true, },
    ];
}

export function getBlacklistCellData() {
    return [
        {charLength: 4, type: 'normal', val: '', label: 'id', prop: 'id', show: true,},
        { type: 'normal', val: '', label: '证件类型', prop: 'cardTypeStr', show: true, },
        { type: 'normal', val: '', label: '国家', prop: 'country', show: true, },
        { type: 'normal', val: '', label: '证件号', prop: 'cardNo', show: true,},
        { type: 'normal', val: '', label: '名单类型', prop: 'tagStr', show: true, },
        { type: 'normal', val: '', label: '名单来源', prop: 'sourceStr', show: true, },
        { type: 'normal', val: '', label: '名单类型', prop: 'tag', queryParameters: true,  needDictionary: { code: 'tag', codeName: 'desc', codeValue: 'name', label:'黑名单' }, },
        { type: 'normal', val: '', label: '证件类型', prop: 'cardType', queryParameters: true,  needDictionary: { code: 'cardType', codeName: 'desc', codeValue: 'name' }, },
        { type: 'normal', val: '', label: '国家代码', prop: 'countryCode', queryParameters: true,  needDictionary: { code: 'countryCode', codeName: 'desc', codeValue: 'name', filterable: true }, },
        { type: 'normal', val: '', label: '来源', prop: 'source', queryParameters: true,  needDictionary: { options: [{ value: 'SYSTEM', label: '系统生成' }, { value: 'MANUAL', label: '手动导入' }]}, },
        { type: 'normal', val: '', label: '备注', prop: 'remark', show: true, queryParameters: true, },
        { type: 'time', val: '', label: '创建时间', prop: 'createTime', queryParameters: true, startTime:'startCreateDate', endTime:'endCreateDate' },
        { type: 'normal', val: '', label: '有效期', prop: 'validityTime',show: true, },
        { type: 'normal', val: '', label: '创建时间', prop: 'createTime', show: true,},
        { type: 'normal', val: '', label: '更新时间', prop: 'updateTime', show: true, },
    ];
}