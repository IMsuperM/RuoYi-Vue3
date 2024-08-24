<template>
    <div class="page">
        <div class="top">
            <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
        <div class="bottom">
            <template v-if="loading">
                <el-skeleton :rows="6" animated />
            </template>
            <template v-else>
                <el-table :data="tableData" height="100%" border style="max-height:100%; width: 100%" @cell-click="showUnitInput">
                    <el-table-column prop="callTypeStr" label="调用接口" width="220px">
                        <template #default="{ row, column }">
                            <select-option v-if="tableRowEditId === row.id && tableColumnEditIndex === column.id" v-model="row.callType" v-model:optionsLabel="row.callTypeStr" :selectConfig="dictionary" />
                            <span v-else>{{ row.callTypeStr }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="callFee" label="调用费用" width="100px">
                        <template #default="{ row, column }">
                            <el-input v-if="tableRowEditId === row.id && tableColumnEditIndex === column.id" v-model="row.callFee" type="number" />
                            <span v-else>{{ row.callFee }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="disabled" label="是否启用">
                        <template #default="{ row, column }">
                            <el-switch v-model="row.disabled" :active-value="true" :inactive-value="false"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注">
                        <template #default="{ row, column }">
                            <el-input v-if="tableRowEditId === row.id && tableColumnEditIndex === column.id" v-model="row.remark" />
                            <span v-else>{{ row.remark }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template #default="{ row }">
                            <!-- <el-button v-if="tableRowEditId === row.id || row.type" type="primary" size="small" @click="submiteFeeConfig()">确认</el-button>
                            <el-button v-else link type="primary" size="small" icon="EditPen" @click="showUnitInput(row)">编辑</el-button> -->
                            <el-button type="danger" size="small" link icon="Delete" @click="handleDelete(row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submiteFeeConfig">确 定</el-button>
        </div>
    </div>
</template>

<script setup name="EditTable">
import { feeConfig, feeConfigUpdate } from '@/api/partners'
import SelectOption from '@/components/CommonTable/SelectOption.vue'
const emit = defineEmits(['cancel'])

const $modal = inject('$modal')

const props = defineProps({
    // 合作方Id
    partnerId: {
        type: Number,
        default: () => 0
    }
})

const loading = ref(true)
const dictionary = reactive({ code: 'notifyType', codeName: 'desc', codeValue: 'name', filterable: true })
let tableRowEditId = ref(null) // 控制可编辑的每一行
let tableColumnEditIndex = ref(null) //控制可编辑的每一列
const switchDisabled = computed(() => {
    return function (row) {
        if (row.type) return false
        else if (tableRowEditId.value !== row.id) return false
        else return true
    }
})
// const tableData = ref([
//     {
//         callType: 'WHATSAPP_API',
//         callTypeStr: 'whatsapp服务',
//         callFee: 0.1,
//         disabled: false,
//         remark: null
//     },
//     {
//         callType: 'WHATSAPP_API',
//         callTypeStr: 'whatsapp服务',
//         callFee: 0.1,
//         disabled: true,
//         remark: null
//     },
//     {
//         callType: 'WHATSAPP_API',
//         callTypeStr: 'whatsapp服务',
//         callFee: 0.1,
//         disabled: true,
//         remark: null
//     },
//     {
//         callType: 'WHATSAPP_API',
//         callTypeStr: 'whatsapp服务',
//         callFee: 0.1,
//         disabled: true,
//         remark: null
//     }
// ])
const tableData = ref([])

function handleAdd() {
    tableData.value.push({
        id: `add-${new Date().getTime()}`,
        type: 'add',
        callType: '',
        callTypeStr: '',
        callFee: 0,
        disabled: true,
        remark: null
    })
    // tableRowEditId.value = `add-${new Date().getTime()}`
}

// 删除
function handleDelete(row) {
    // 新增的行直接 删除
    const index = tableData.value.indexOf(row)
    if (index !== -1) {
        tableData.value.splice(index, 1)
    }
    return

    $modal
        .confirm('是否确认删除该数据项?')
        .then(function () {
            const index = tableData.value.indexOf(row)
            if (index !== -1) {
                tableData.value.splice(index, 1)
            }
            submiteFeeConfig()
        })
        .then(() => {
            $modal.msgSuccess('删除成功')
        })
        .catch(() => {})
}
function showUnitInput(row, column) {
    //赋值给定义的变量
    tableRowEditId.value = row.id //确定点击的单元格在哪行 如果数据中有ID可以用ID判断，没有可以使用其他值判断，只要能确定是哪一行即可
    tableColumnEditIndex.value = column.id //确定点击的单元格在哪列
}
function submiteFeeConfig() {
    //在此处调接口传数据
    const partnerId = props.partnerId
    feeConfigUpdate({ partnerId, feeConfigList: [...tableData.value] })
        .then(response => {
            cancel() //关闭弹窗
        })
        .catch(err => {})
}

// 取消
function cancel() {
    emit('cancel')
}
function queryFeeConfig() {
    loading.value = true
    const partnerId = props.partnerId
    feeConfig({ partnerId })
        .then(response => {
            tableData.value = response.data
            loading.value = false
        })
        .catch(err => {
            loading.value = false
        })
}

onMounted(() => {
    queryFeeConfig()
})
</script>

<style scoped lang="scss">
.page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .top {
    }
    .bottom {
        flex: 1;
        overflow: auto;
    }
    .dialog-footer {
        display: flex;
        justify-content: flex-end;
        padding-top: 10px;
    }
}
</style>
