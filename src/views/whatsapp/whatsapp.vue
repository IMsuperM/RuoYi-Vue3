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
         <!-- 分页主键 -->
        <pagination v-show="total > 10" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getWhatsappList" />
    </div>
</template>

<script setup name="Statistics">
import { queryWhatsappList } from '@/api/whatsapp'
import { getWhatsAppCellData } from '@/dataSource/whatsApp'
import CommonTable from '@/components/CommonTable'
import TableHeaderSearch from '@/components/CommonTable/TableHeaderSearch'

const loading = ref(false)
// 分页数据
const pageList = ref([])
// 分页查询条件
const queryParams = reactive({ pageNum: 1, pageSize: 10 })
// 分页控件使用的总条目
const total = ref(0)
// 表格数据
const tableHeader = ref(getWhatsAppCellData())
// 表头 查询条件
const queryTableParams = ref(getWhatsAppCellData().filter(field => field.queryParameters))

/** 查询列表 */
function getWhatsappList() {
    loading.value = false
    queryWhatsappList(queryParams)
        .then(response => {
            pageList.value = response.data?.list
            total.value = response.data?.total
            loading.value = true
        })
        .catch(error => {
            console.log('queryWhatsappList ~ error:', error)
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
    // console.log('handleQuery ~ queryParams:', queryParams)
    // 查询列表
    getWhatsappList()
}

/** 重置-操作 */
function resetQuery() {
    queryTableParams.value.map(q => {
        q.val = ''
    })
    handleQuery()
}

onMounted(() => {
    handleQuery()
})
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
