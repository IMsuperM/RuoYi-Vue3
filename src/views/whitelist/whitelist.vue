<template>
    <div class="app-container">
        <!-- 表格搜索 -->
        <table-header-search :query-params="queryTableParams" :upload-aciton="true" :delet-aciton="true" @handle-upload="handleUpload" @handle-delete="handleDelete" @handle-query="handleQuery" @reset-query="resetQuery" />
        <!-- 表格数据 -->
        <template v-if="loading">
            <common-table :data="pageList" :hasSelection="true" :tableHeader="tableHeader" :border="true" :hasOperation="false" @hand-selection-change="handSelectionChange" />
        </template>
        <template v-else>
            <el-skeleton :rows="6" animated />
        </template>
        <!-- 分页主键 -->
        <pagination v-show="total > 10" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getUserList" />
        <!-- 导入表单 -->
        <el-dialog v-model="open" title="导入名单" width="700px" style="margin-top: 20vh !important" append-to-body @closed="reset">
            <el-form ref="formRef" :model="uploadForm" :show-message="false" label-width="120px">
                <el-form-item label="证件类型" prop="cardType" :rules="[{ required: true, message: `请选择证件类型`, trigger: ['blur', 'change'] }]">
                    <!-- <el-form-item label="证件类型"> -->
                    <select-option v-model="uploadForm.cardType" :select-config="cardType" />
                </el-form-item>
                <el-form-item label="名单类型">
                    <Radio v-model="uploadForm.tag" :select-config="tag" :default-name="'白名单'" :disabled="true" />
                </el-form-item>
                <el-form-item label="导入方式">
                    <Radio v-model="uploadType.value" :select-config="uploadType" />
                </el-form-item>
                <el-form-item label="国家代码" prop="countryCode" :rules="[{ required: true, message: `请选择国家`, trigger: ['blur', 'change'] }]">
                    <select-option v-model="uploadForm.countryCode" :select-config="countryCode" />
                </el-form-item>
                <el-form-item label="有效期" prop="validityTime" :rules="[{ required: true, message: `请选择有效期日期`, trigger: ['blur', 'change'] }]">
                    <el-date-picker v-model="uploadForm.validityTime" type="date" value-format="YYYY-MM-DD" format="YYYY-MM-DD" placeholder="选择日期" />
                </el-form-item>
                <el-form-item v-if="uploadType.value" label="证件号" prop="cardNo" :rules="[{ required: true, message: `请输入证件号`, trigger: ['blur', 'change'] }]">
                    <el-input v-model="uploadForm.cardNo" type="text" placeholder="请输入证件号" />
                </el-form-item>
                <el-form-item v-else label="文件" prop="file">
                    <el-upload ref="uploadRef" action="" accept=".xlsx, .xls" :multiple="false" :limit="1" :auto-upload="false" :http-request="httpRequest" :file-list="fileList">
                        <el-button size="small" icon="Upload" type="primary">选择Excel文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="uploadForm.remark" type="textarea" placeholder="备注" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="WhiteList">
import { queryUserList, uploadList, deleteRequest } from '@/api/whitelist'
import { getWhitelistCellData } from '@/dataSource/user'
import CommonTable from '@/components/CommonTable'
import TableHeaderSearch from '@/components/CommonTable/TableHeaderSearch'
import SelectOption from '@/components/CommonTable/SelectOption.vue'
import Radio from '@/components/CommonTable/Radio.vue'

const $modal = inject('$modal')

const loading = ref(false)
// 分页数据
const pageList = ref([])
// 分页查询条件
const queryParams = reactive({ pageNum: 1, pageSize: 10 })
// 分页控件使用的总条目
const total = ref(0)
// 表格数据
const tableHeader = ref(getWhitelistCellData())
// 表头 查询条件
const queryTableParams = ref(getWhitelistCellData().filter(field => field.queryParameters))

// 导入表单标识
const open = ref(false)
// 导入表单
const uploadForm = reactive({
    file: [],
    cardNo: '',
    cardType: '',
    tag: '',
    validityTime: '',
    countryCode: '',
    remark: ''
})
const formRef = ref(null)
// 导入方式
const uploadType = reactive({
    value: 'true',
    options: [
        { value: 'true', label: '单独导入' },
        { value: '', label: '批量导入' }
    ]
})

// 相关字典
const countryCode = reactive({ code: 'countryCode', codeName: 'desc', codeValue: 'name' })
const cardType = reactive({ code: 'cardType', codeName: 'desc', codeValue: 'name' })
const tag = reactive({ code: 'tag', codeName: 'desc', codeValue: 'name' })

const uploadRef = ref(null)
const fileList = ref([])

// 选择的操作列
const tableSelection = ref([])

// 表格的勾选
function handSelectionChange(selection) {
    // console.log('handSelectionChange ~ selection:', selection)
    tableSelection.value = selection
}
// 删除操作
function handleDelete() {
    if (tableSelection.value.length === 0) {
        $modal.msgError('请先选择数据，再进行操作')
        return
    }

    const idArr = tableSelection.value.map(t => {
        return t.id
    })
    $modal
        .confirm('是否确认删除所选数据项\?')
        .then(function () {
            return deleteRequest({ idList: idArr })
        })
        .then(() => {
            resetQuery() // 重新查询
            $modal.msgSuccess('删除成功')
        })
        .catch(() => {})
}

/** 查询列表 */
function getUserList() {
    loading.value = false
    queryUserList(queryParams)
        .then(response => {
            pageList.value = response.data.list
            total.value = response.data.total
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
    // 查询列表
    getUserList()
}

/** 重置-操作 */
function resetQuery() {
    queryTableParams.value.map(q => {
        // tag 名单类型字段 不操作
        q.prop !== 'tag' && (q.val = '')
    })
    handleQuery()
}

/** 导入-操作 */
function handleUpload() {
    open.value = true
}

/** 添加---提交按钮 */
async function submitForm() {
    !uploadType.value && uploadRef.value.submit() // 上传组件会触发 httpRequest 方法
    // console.log('submitForm ~ submitForm:', uploadForm)

    let validateFlg = false
    await formRef.value.validate(valid => {
        validateFlg = valid
        if (valid) {
            // console.log('submit!')
        } else {
            // console.log('error submit!')
        }
    })
    if (!validateFlg) return
    if (!uploadType.value && uploadForm.file.length === 0) {
        $modal.msgError('请选择文件')
        return
    }

    // 新建form表单
    const formData = new FormData()
    const keys = Object.keys(uploadForm)
    keys.map(k => {
        if (uploadType.value) {
            // 单独导入时 不需要文件
            k !== 'file' && formData.append(k, uploadForm[k])
        } else {
            // 批量导入时不需要填 证件号
            k !== 'cardNo' && formData.append(k, uploadForm[k])
        }
    })
    uploadList(formData).then(res => {
        resetQuery() // 重新查询
        cancel() // 关闭弹框
        $modal.msgSuccess('导入成功')
    })
}

/**  添加---取消按钮 关闭弹框 */
function cancel() {
    open.value = false
    reset()
}
function reset() {
    if (!formRef.value) return
    formRef.value.resetFields()
}

//  # 覆盖原本的提交方法，我们指定一个函数，在其中完成参数的提取，
function httpRequest(param) {
    // console.log('httpRequest ~ param:', param, fileList.value)
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
