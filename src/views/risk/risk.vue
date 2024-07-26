<template>
    <div class="app-container">
        <!-- 表格搜索 -->
        <table-header-search :query-params="queryTableParams" :add-aciton="false" @handle-query="handleQuery" @reset-query="resetQuery" />
        <!-- 表格数据 -->
        <!-- <common-table :data="pageList" :tableHeader="tableHeader" :border="true" :max-height="'400px'" @handle-update="handleUpdate" @handle-delete="handleDelete" @handle-status-change="handleStatusChange" /> -->

        <template v-if="pageList.length > 0">
            <common-table :data="pageList" :tableHeader="tableHeader" :border="true" :max-height="'400px'" @handle-update="handleUpdate" @handle-delete="handleDelete" @handle-status-change="handleStatusChange" />
        </template>
        <template v-else>
            <el-skeleton :rows="6" animated />
        </template>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="queryPartnerList" />
    </div>
</template>
<script setup name="Risk">
import { list, queryRiskList } from '@/api/risk'
import { getRiskCellData } from '@/dataSource/risk'
import CommonTable from '@/components/CommonTable'
import TableHeaderSearch from '@/components/CommonTable/TableHeaderSearch'

const { proxy } = getCurrentInstance()

// 分页数据
const pageList = ref([])
// 分页查询条件
const queryParams = reactive({ pageNum: 1, pageSize: 10 })
// 分页控件使用的总条目
const total = ref(0)
// 表格数据
const tableHeader = ref(getRiskCellData())
// 表头 查询条件
const queryTableParams = ref(getRiskCellData().filter(field => field.queryParameters))

function tts() {
    list().then(response => {
        console.log('tt ~ res:', response)
        pageList.value = response.data.list
        total.value = response.data.total
    })
}
tts()
/** 查询列表 */
function getRiskList() {
    queryRiskList(queryParams).then(response => {
        pageList.value = response.data.list
        total.value = response.data.total
    })
}

/** 搜索按钮操作 */
function handleQuery() {
    queryTableParams.value.map(q => {
        if ((q.type === 'time')) {
            queryParams[q.startTime] = q.val && q.val[0]
            queryParams[q.endTime] = q.val && q.val[1]
        } else {
            queryParams[q.prop] = q.val
        }
    })
    queryParams.pageNum = 1
    console.log("handleQuery ~ queryParams:", queryParams);
    // 查询列表
    // getRiskList()
}

/** 重置-操作 */
function resetQuery() {
    queryTableParams.value.map(q => {
        q.val = ''
    })
    handleQuery()
}


// handleQuery()
</script>
