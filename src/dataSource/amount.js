/**
 * charLength 字段在表格中长度设置
 * show 该 字段是否在表格中展示
 * label 中文字段
 * prop 表字段
 * queryParameters 是否作为查询条件
 * needDictionary  需要查询字典的 字段; filterable- 是否需要字典下拉项 可搜索匹配
 * addFlg 是否是属于 添加操作 字段
 */

// 余额变更记录
export function getAmountCellData() {
    return [
        { type: 'normal', val: '', label: 'id', prop: 'id' },
        { charLength: 12, type: 'normal', val: '', label: '合作方CODE', prop: 'partnerCode', show: true },
        { charLength: 12, type: 'normal', val: '', label: '合作方名称', prop: 'partnerName', show: true },
        { charLength: 8, type: 'normal', val: '', label: '变更前余额', prop: 'originalAmount', show: true },

        { charLength: 8, type: 'normal', val: '', label: '变更金额', prop: 'changeAmount', show: true },
        { charLength: 8, type: 'normal', val: '', label: '变更后余额', prop: 'updatedAmount', show: true },
        {
            charLength: 8,
            type: 'boolean',
            val: '',
            label: '变更类型',
            prop: 'type',
            show: true,
            queryParameters: true,
            needDictionary: { code: 'changeType', codeName: 'desc', codeValue: 'name', filterable: true }
        },
        {  charLength: 10, type: 'normal', val: '', label: '备注', prop: 'remark', show: true },
        { type: 'normal', val: '', label: '创建人', prop: 'createUsername', show: true },
        { charLength: 10, type: 'normal', val: '', label: '创建时间', prop: 'createTime', show: true },
        { type: 'normal', val: '', label: '合作方名称', prop: 'partnerId', queryParameters: true, needDictionary: { code: 'partner', codeName: 'desc', codeValue: 'name', filterable: true } },
        { type: 'time', val: '', label: '查询时间', prop: 'statisticDate', queryParameters: true, startTime: 'startTime', endTime: 'endTime' },
    ]
}
