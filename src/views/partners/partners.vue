<template>
    <div class="app-container">
        <!-- 表格搜索 -->
        <table-header-search :query-params="queryTableParams" @handle-query="handleQuery" @handle-add="handleAdd" @reset-query="resetQuery" />
        <!-- 表格数据 -->
        <common-table :data="partnersList" :tableHeader="tableHeader" :border="true" @handle-update="handleUpdate" @handle-delete="handleDelete" @handle-status-change="handleStatusChange" />

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="queryPartnerList" />

        <!-- 添加或修改角色配置对话框 -->
        <el-dialog :title="title" v-model="open" width="500px" style="margin-top: 20vh !important" append-to-body>
            <el-form :model="addForm" label-width="100px">
                <el-form-item v-for="item in addForm" :key="item.prop" :label="item.label" :prop="item.prop">
                    <template v-if="item.needDictionary">
                        <!-- 字典类型 -->
                        <select-option :selectConfig="item.needDictionary" v-model="item.val" />
                    </template>
                    <template v-else>
                        <el-input v-model="item.val" :placeholder="`请输入${item.label}`" />
                    </template>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm()">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="Partners">
import { createPartner, deletePartner, updatePartner, updatePartnerStatus, queryPartnerList } from '@/api/partners'
import { getPartnersCellData } from '@/dataSource/partners'
import CommonTable from '@/components/CommonTable'
import TableHeaderSearch from '@/components/CommonTable/TableHeaderSearch'
import SelectOption from '@/components/CommonTable/SelectOption.vue'

const { proxy } = getCurrentInstance()

// 分页数据
const partnersList = ref([])
// 分页查询条件
const queryParams = reactive({ pageNum: 1, pageSize: 10 })
// 分页控件使用的总条目
const total = ref(0)
// 表格数据
const tableHeader = ref(getPartnersCellData())
// 表头 查询条件
const queryTableParams = ref(getPartnersCellData().filter((field) => field.queryParameters))

// 添加表单 部分
const open = ref(false) // 弹框显示标识
const title = ref('')
const addForm = ref(getPartnersCellData().filter((field) => field.addFlg))
const operateType = ref('') // 是修改 还 添加操作
const editId = ref('') // 修改操作的行 ID
const loading = ref(true)

/** 查询列表 */
function getPartnersList() {
    loading.value = true
    queryPartnerList(queryParams).then((response) => {
        partnersList.value = response.data.list
        total.value = response.data.total
        loading.value = false
    })
}

/** 搜索按钮操作 */
function handleQuery() {
    queryTableParams.value.map((q) => {
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
function submitForm() {
    loading.value = true
    const param = {}
    addForm.value.map((ad) => (param[ad.prop] = ad.val))
    if (operateType.value === 'add') {
        createPartner(param).then((response) => {
            resetQuery() // 重新查询
            loading.value = true
            cancel() // 关闭弹框
        })
    } else if (operateType.value === 'edit') {
        param.id = editId.value
        updatePartner(param).then((response) => {
            resetQuery() // 重新查询
            loading.value = true
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
    addForm.value.map((item) => (item.val = ''))
}

/** 重置-操作 */
function resetQuery() {
    queryTableParams.value.map((q) => {
        q.val = ''
    })
    handleQuery()
}

// 修改
function handleUpdate(row) {
    console.log('handleUpdate ~ row:', row)
    // 赋值数据
    addForm.value.map((item) => {
        item.val = row[item.prop]
    })
    title.value = '修改合作机构'
    open.value = true
    editId.value = row.id
    operateType.value = 'edit'
}

// 删除
function handleDelete(row) {
    console.log('handleDelete ~ row:', row)
    const id = row.id
    proxy.$modal
        .confirm('是否确认删除该数据项?')
        .then(function () {
            return deletePartner({ id })
        })
        .then(() => {
            resetQuery() // 重新查询
            proxy.$modal.msgSuccess('删除成功')
        })
        .catch(() => {})
}



/** 角色状态修改 */
function handleStatusChange(row) {
    // let text = row.status ? '启用' : '停用'
    proxy.$modal
        .confirm('确认要角色吗?')
        .then(function () {
            // return changeRoleStatus(row.roleId, row.status)
        })
        .then(() => {
            proxy.$modal.msgSuccess('成功')
        })
        .catch(function () {
        })
}



// /** 删除按钮操作 */
// function handleDelete(row) {
//     const roleIds = row.roleId || ids.value
//     proxy.$modal
//         .confirm('是否确认删除角色编号为"' + roleIds + '"的数据项?')
//         .then(function () {
//             return delRole(roleIds)
//         })
//         .then(() => {
//             getList()
//             proxy.$modal.msgSuccess('删除成功')
//         })
//         .catch(() => {})
// }

/** 导出按钮操作 */
function handleExport() {
    proxy.download(
        'system/role/export',
        {
            ...queryParams.value,
        },
        `role_${new Date().getTime()}.xlsx`
    )
}

/** 多选框选中数据 */
function handleSelectionChange(selection) {
    ids.value = selection.map((item) => item.roleId)
    single.value = selection.length != 1
    multiple.value = !selection.length
}


// /** 重置新增的表单以及其他数据  */
// function reset() {
//     if (menuRef.value != undefined) {
//         menuRef.value.setCheckedKeys([])
//     }
//     menuExpand.value = false
//     menuNodeAll.value = false
//     deptExpand.value = true
//     deptNodeAll.value = false
//     form.value = {
//         roleId: undefined,
//         roleName: undefined,
//         roleKey: undefined,
//         roleSort: 0,
//         status: '0',
//         menuIds: [],
//         deptIds: [],
//         menuCheckStrictly: true,
//         deptCheckStrictly: true,
//         remark: undefined,
//     }
//     proxy.resetForm('roleRef')
// }

/** 修改角色 */
// function handleUpdate(row) {
//     reset()
//     const roleId = row.roleId || ids.value
//     const roleMenu = getRoleMenuTreeselect(roleId)
//     getRole(roleId).then((response) => {
//         form.value = response.data
//         form.value.roleSort = Number(form.value.roleSort)
//         open.value = true
//         nextTick(() => {
//             roleMenu.then((res) => {
//                 let checkedKeys = res.checkedKeys
//                 checkedKeys.forEach((v) => {
//                     nextTick(() => {
//                         menuRef.value.setChecked(v, true, false)
//                     })
//                 })
//             })
//         })
//         title.value = '修改角色'
//     })
// }

handleQuery()
</script>
