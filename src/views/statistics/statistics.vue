<template>
    <div class="app-container">
        <!-- 表格搜索 -->
        <table-header-search :query-params="queryTableParams" @handle-query="handleQuery" @reset-query="resetQuery" />
        <!-- 表格数据 -->
        <template v-if="loading">
            <common-table :data="pageList" :tableHeader="tableHeader" :border="true" :hasOperation="false" />
        </template>
        <template v-else>
            <el-skeleton :rows="8" animated />
        </template>
    </div>
</template>
<script setup name="Statistics">
import { queryStatisticsList } from '@/api/statistics'
import { getStatisticsCellData } from '@/dataSource/statistics'
import CommonTable from '@/components/CommonTable'
import TableHeaderSearch from '@/components/CommonTable/TableHeaderSearch'

import { reactive } from 'vue'

const { proxy } = getCurrentInstance()

const loading = ref(false)
// 分页数据
const pageList = ref([])
// 分页查询条件
const queryParams = reactive({ pageNum: 1, pageSize: 10 })
// 表格数据
const tableHeader = ref(getStatisticsCellData())
// 表头 查询条件
const queryTableParams = ref(getStatisticsCellData().filter(field => field.queryParameters))

const uploadRef = ref(null)
const fileList = ref([])
/** 查询列表 */
function getStatisticsList() {
    loading.value = false
    queryStatisticsList(queryParams)
        .then(response => {
            pageList.value = response.data
            loading.value = true
        })
        .catch(error => {
            console.log('queryRiskList ~ error:', error)
            loading.value = true
        })
}

/** 搜索按钮操作 */
function handleQuery() {
    queryTableParams.value.map(q => {
        if (q.type === 'time') {
            // 补全时间条件
            queryParams[q.startTime] = (q.val && q.val[0] && q.val[0] + ' 00:00:00') || ''
            queryParams[q.endTime] = (q.val && q.val[1] && q.val[1] + ' 00:00:00') || ''
        } else {
            queryParams[q.prop] = q.val
        }
    })
    queryParams.pageNum = 1
    console.log('handleQuery ~ queryParams:', queryParams)
    // 查询列表
    getStatisticsList()
}

/** 重置-操作 */
function resetQuery() {
    queryTableParams.value.map(q => {
        q.val = ''
    })
    handleQuery()
}

/** 导入-操作 */
function handleUpload() {
    open.value = true
}

/** 添加---提交按钮 */
function submitForm() {
    uploadRef.value.submit()
    console.log('submitForm ~ submitForm:', uploadForm)
    // 新建form表单
    const formData = new FormData()
    const keys = Object.keys(uploadForm)
    keys.map(k => {
        formData.append(k, uploadForm[k])
    })
    console.log('submitForm ~ formData:', formData)
    uploadList(formData).then(res => {
        console.log('uploadList ~ res:', res)
        resetQuery() // 重新查询
        cancel() // 关闭弹框
        proxy.$modal.msgSuccess('导入成功')
    })
}

/**  添加---取消按钮 关闭弹框 */
function cancel() {
    open.value = false
    reset()
}
function reset() {
    uploadForm.value = {
        file: [],
        cardNo: '',
        cardType: '',
        tag: '',
        validityTime: '',
        countryCode: '',
        remark: '',
    }
}

// onSuccess
function onSuccess(val) {
    console.log('onSuccess ~ val:', val)
}
//  # 覆盖原本的提交方法，我们指定一个函数，在其中完成参数的提取，
function httpRequest(param) {
    console.log('httpRequest ~ param:', param, fileList.value)
    //把上传的文件赋值给uploadForm属性的file
    uploadForm.file = param.file
}

handleQuery()
</script>

<style scoped lang="scss">
.el-input {
    max-width: 300px;
}
:deep(.el-date-editor.el-input) {
    width: 200px;
}
:deep(.el-upload-list) {
    min-width: 200px;
}
</style>
