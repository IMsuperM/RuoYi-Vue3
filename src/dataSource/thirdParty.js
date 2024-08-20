/**
 * show 该 字段是否在表格中展示
 * label 中文字段
 * prop 表字段
 * queryParameters 是否作为查询条件
 * needDictionary  需要查询字典的 字段; filterable- 是否需要字典下拉项 可搜索匹配
 * addFlg 是否是属于 添加操作 字段
 */

//  三方平台调用统计
export function getThirdStatisticsCellData() {
    return [
        { type: 'normal', val: '', label: '统计日期', prop: 'statisticDate', show: true },
        { type: 'normal', val: '', label: '合作方名称', prop: 'partnerName', show: true },
        { type: 'normal', val: '', label: '合作方编码', prop: 'partnerCode', show: true },
        { type: 'normal', val: '', label: '国家', prop: 'country', show: true },
        { type: 'normal', val: '', label: 'whatsapp调用数', prop: 'whatsAppRecordCount', show: true },
        { type: 'normal', val: '', label: 'whatsapp调用费用', prop: 'whatsAppRecordCallFee', show: true },

        { type: 'normal', val: '', label: '调用类型', prop: 'notifyType', queryParameters: true, needDictionary: { code: 'notifyType', codeName: 'desc', codeValue: 'name', filterable: true } },
        { type: 'normal', val: '', label: '合作方名称', prop: 'partnerId', queryParameters: true, needDictionary: { code: 'partner', codeName: 'desc', codeValue: 'name', filterable: true } },
        { type: 'normal', val: '', label: '国家代码', prop: 'countryCode', queryParameters: true, needDictionary: { code: 'countryCode', codeName: 'desc', codeValue: 'name', filterable: true } },
        { type: 'time', val: '', label: '查询时间', prop: 'statisticDate', queryParameters: true, startTime: 'startTime', endTime: 'endTime' }
    ]
}
//  三方平台调用记录
export function getThirdPartyCellData() {
    return [
        { type: 'normal', val: '', label: 'id', prop: 'id' },
        { type: 'normal', val: '', label: '合作方名称', prop: 'partnerName', show: true },
        { type: 'normal', val: '', label: '合作方编码', prop: 'partnerCode', show: true },
        { type: 'normal', val: '', label: '国家', prop: 'country', show: true },

        { type: 'normal', val: '', label: '调用订单号', prop: 'recordNo', show: true, queryParameters: true },
        { type: 'normal', val: '', label: '调用类型', prop: 'notifyType', show: true, queryParameters: true, needDictionary: { code: 'notifyType', codeName: 'desc', codeValue: 'name', filterable: true } },
        { charLength: 14, type: 'normal', val: '', label: '请求参数', prop: 'requestData', show: true },
        { charLength: 10, type: 'normal', val: '', label: '请求时间', prop: 'notifyTime', show: true },
        { charLength: 14, type: 'normal', val: '', label: '返回参数', prop: 'responseData', show: true },
        { charLength: 10, type: 'normal', val: '', label: '返回时间', prop: 'responseTime', show: true },

        {
            type: 'boolean',
            val: '',
            label: '调动状态',
            prop: 'notifyStatus',
            show: true,
            queryParameters: true,
            needDictionary: {
                options: [
                    { value: true, label: '是' },
                    { value: false, label: '否' }
                ]
            }
        },
        { type: 'normal', val: '', label: '调用费用', prop: 'callFee', show: true },
        { type: 'normal', val: '', label: '备注', prop: 'remark', show: true },
        { charLength: 10, type: 'normal', val: '', label: '创建时间', prop: 'createTime', show: true },
        { charLength: 10, type: 'normal', val: '', label: '更新时间', prop: 'updateTime', show: true },

        { type: 'normal', val: '', label: '合作方名称', prop: 'partnerId', queryParameters: true, needDictionary: { code: 'partner', codeName: 'desc', codeValue: 'name', filterable: true } },
        { type: 'normal', val: '', label: '国家代码', prop: 'countryCode', queryParameters: true, needDictionary: { code: 'countryCode', codeName: 'desc', codeValue: 'name', filterable: true } },
        { type: 'time', val: '', label: '调用时间', prop: 'statisticDate', queryParameters: true, startTime: 'startTime', endTime: 'endTime' }
    ]
}

// id	string	统计日期
// partnerCode	string	合作方编码
// partnerName	string	合作方名称
// country	string	国家
// recordNo	string	调用订单号
// notifyType	string	调用类型
// requestData	string	请求参数
// notifyTime	string	请求时间
// responseData	string	返回参数
// responseTime	string	返回时间
// notifyStatus	string	调动状态 true-成功 false-失败
// callFee	string	调用费用
// remark	string	备注
// createTime	string	创建时间
// updateTime	string	更新时间
