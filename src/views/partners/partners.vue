<template>
    <div class="app-container">
        <!-- 表格搜索 -->
        <table-header-search :query-params="queryTableParams" :add-aciton="true" @handle-query="handleQuery" @handle-add="handleAdd" @reset-query="resetQuery" />
        <!-- 表格数据 -->
        <template v-if="loading">
            <common-table :data="partnersList" :tableHeader="tableHeader" :border="true" @handle-edit="handleEdit" @handle-recharge="handleRecharge" @handle-update="handleUpdate" @handle-delete="handleDelete" @handle-status-change="handleStatusChange" />
        </template>
        <template v-else>
            <el-skeleton :rows="6" animated />
        </template>

        <pagination v-show="total > 10" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getPartnersList" />

        <!-- 添加或修改角色配置对话框 -->
        <el-dialog v-model="open" :title="title" width="500px" style="margin-top: 20vh !important" append-to-body @closed="reset">
            <el-form ref="formRef" :model="addForm" :show-message="false" label-width="100px">
                <el-form-item v-for="(value, key, index) in addForm" :key="key" :label="formRule[key].label" :prop="key" :rules="formRule[key].rule">
                    <template v-if="formRule[key].needDictionary">
                        <!-- 字典类型 -->
                        <select-option v-model="addForm[key]" :selectConfig="formRule[key].needDictionary" />
                    </template>
                    <template v-else>
                        <el-input v-model="addForm[key]" :type="formRule[key].inputType || 'text'" :placeholder="`请输入${formRule[key].label}`" />
                    </template>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </template>
        </el-dialog>

        <!-- 充值 -->
        <el-dialog v-model="rechargeOpen" title="充值" width="400px" style="margin-top: 20vh !important" append-to-body @closed="rechargeReset">
            <el-form ref="rechargeFormRef" :model="rechargeForm" :show-message="false" label-width="100px">
                <el-form-item label="合作机构" prop="name">
                    <el-input v-model="rechargeFormShow.name" disabled />
                </el-form-item>
                <el-form-item label="合作机构编码" prop="code">
                    <el-input v-model="rechargeFormShow.code" disabled />
                </el-form-item>
                <el-form-item label="充值金额" prop="rechargeAmount" :rules="[{ required: true }]">
                    <el-input v-model="rechargeForm.rechargeAmount" type="number" placeholder="请输入充值金额" />
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="rechargeForm.remark" type="textarea" placeholder="请输入备注" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="rechargeSubmitForm">确 定</el-button>
                    <el-button @click="rechargeCancel">取 消</el-button>
                </div>
            </template>
        </el-dialog>

        <!-- 费用配置 -->
        <el-dialog v-model="feeConfig" title="费用配置" width="60%" style="height: 60%; overflow: hidden; margin-top: 20vh !important">
            <EditTable v-if="feeConfig" :partnerId="feeConfigId" @cancel="feeConfig = false" />
        </el-dialog>
    </div>
</template>

<script setup name="Partners">
import { createPartner, deletePartner, updatePartner, updatePartnerStatus, queryPartnerList, recharge } from '@/api/partners'
import { getPartnersCellData } from '@/dataSource/partners'
import CommonTable from '@/components/CommonTable'
import TableHeaderSearch from '@/components/CommonTable/TableHeaderSearch'
import SelectOption from '@/components/CommonTable/SelectOption.vue'
import EditTable from './editTable.vue'

const $modal = inject('$modal')

const loading = ref(false)
// 分页数据
const partnersList = ref([])
// 分页查询条件
const queryParams = reactive({ pageNum: 1, pageSize: 10 })
// 分页控件使用的总条目
const total = ref(0)
// 表格数据
const tableHeader = ref(getPartnersCellData())
// 表头 查询条件
const queryTableParams = ref(getPartnersCellData().filter(field => field.queryParameters))

// 添加表单 部分
const open = ref(false) // 弹框显示标识
const title = ref('')
const addForm = reactive({}) // 添加的表单字段
const formRule = reactive({}) // 添加表单字段规则
// const addForm = ref(getPartnersCellData().filter(field => field.addFlg)) // 添加的表单字段
const operateType = ref('') // 是修改 还 添加操作
const editId = ref('') // 修改操作的行 ID
const formRef = ref(null)
getAddForm()

// 充值表单部分
const rechargeForm = reactive({
    id: '',
    rechargeAmount: '',
    remark: ''
})
// 单纯拿来展示的字段
const rechargeFormShow = reactive({
    name: '',
    code: ''
})
const rechargeFormRef = ref(null)
const rechargeOpen = ref(false)

//  费用配置部分
const feeConfig = ref(false)
const feeConfigId = ref('')

// 费用配置
function handleEdit(row) {
    feeConfigId.value = row.id
    feeConfig.value = true
}

// 获取添加表单的字段 及相关规则
function getAddForm() {
    const arr = getPartnersCellData().filter(field => field.addFlg)
    arr.map(item => {
        addForm[item.prop] = ''
        const message = item.needDictionary ? `请选择${item.label}` : `请输入${item.label}`
        formRule[item.prop] = { ...item, rule: [{ required: true, message: message, trigger: 'blur' }] }
        // { required: true, message: message, trigger: ['blur', 'change']}
    })
}
/** 查询列表 */
function getPartnersList() {
    loading.value = false
    queryPartnerList(queryParams)
        .then(response => {
            partnersList.value = response.data.list
            total.value = response.data.total
            loading.value = true
        })
        .catch(err => {
            loading.value = true
        })
}

/** 搜索按钮操作 */
function handleQuery() {
    queryTableParams.value.map(q => {
        queryParams[q.prop] = q.val
    })
    queryParams.pageNum = 1
    // 查询列表
    getPartnersList()
}

/** 添加 */
function handleAdd() {
    reset() // 条件重置下
    title.value = '新增合作机构'
    open.value = true
    operateType.value = 'add'
}

/** 添加---提交按钮 */
async function submitForm() {
    // 必填校验
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

    const param = {}
    Object.keys(addForm).map(key => (param[key] = addForm[key]))
    // addForm.value.map(ad => (param[ad.prop] = ad.val))
    if (operateType.value === 'add') {
        createPartner(param).then(response => {
            resetQuery() // 重新查询
            cancel() // 关闭弹框
        })
    } else if (operateType.value === 'edit') {
        param.id = editId.value
        updatePartner(param).then(response => {
            resetQuery() // 重新查询
            cancel() // 关闭弹框
        })
    }
}

/**  添加---取消按钮 关闭弹框 */
function cancel() {
    open.value = false
    reset()
}
function reset() {
    // Object.keys(addForm).map(item => (addForm[item] = ''))
    // addForm.value.map(item => (item.val = ''))
    if (!formRef.value) return
    formRef.value.resetFields()
}

/** 充值--- 打开弹框 */
function handleRecharge(row) {
    rechargeForm.id = row.id
    rechargeFormShow.name = row.partnerName
    rechargeFormShow.code = row.partnerCode

    // console.log('handleRecharge ~ rechargeForm:', rechargeForm)
    rechargeOpen.value = true
}
/** 充值弹框---确认按钮 */
async function rechargeSubmitForm() {
    // 必填校验
    let validateFlg = false
    await rechargeFormRef.value.validate(valid => {
        validateFlg = valid
        if (valid) {
            // console.log('submit!')
        } else {
            // console.log('error submit!')
        }
    })
    if (!validateFlg) return
    const param = {}
    Object.keys(rechargeForm).map(key => (param[key] = rechargeForm[key]))
    recharge(param).then(response => {
        resetQuery() // 重新查询
        rechargeCancel() // 关闭弹框
    })
}
/**  充值弹框---取消按钮 关闭弹框 */
function rechargeCancel() {
    rechargeOpen.value = false
    if (!rechargeFormRef.value) return
}
function rechargeReset() {
    rechargeFormRef.value.resetFields()
}

/** 重置-操作 */
function resetQuery() {
    queryTableParams.value.map(q => {
        q.val = ''
    })
    handleQuery()
}

// 修改
function handleUpdate(row) {
    // console.log('handleUpdate ~ row:', row)
    // 赋值数据
    Object.keys(addForm).map(key => (addForm[key] = row[key]))
    // addForm.value.map(item => {
    //     item.val = row[item.prop]
    // })
    title.value = '修改合作机构'
    open.value = true
    editId.value = row.id
    operateType.value = 'edit'
}

// 删除
function handleDelete(row) {
    // console.log('handleDelete ~ row:', row)
    const id = row.id
    $modal
        .confirm('是否确认删除该数据项?')
        .then(function () {
            return deletePartner({ id })
        })
        .then(() => {
            resetQuery() // 重新查询
            $modal.msgSuccess('删除成功')
        })
        .catch(() => {})
}

/** 状态修改 */
function handleStatusChange(row) {
    let text = row.disabled ? '启用' : '停用'
    // console.log('handleStatusChange ~ text:', text, row.disabled)
    $modal
        .confirm(`确认要${text}吗?`)
        .then(function () {
            const prarms = { id: row.id, disabled: row.disabled }
            return updatePartnerStatus(prarms)
        })
        .then(() => {
            $modal.msgSuccess(`${text}成功`)
        })
        .catch(function () {
            row.disabled = !row.disabled
        })
}
onMounted(() => {
    handleQuery()
})
</script>

<style lang="scss" scoped>
:deep(.el-dialog__body) {
    height: 100%;
    padding-bottom: 40px;
}
</style>
