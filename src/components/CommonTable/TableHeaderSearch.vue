<template>
    <el-form :model="queryParams" v-show="showSearch" ref="queryRef" :inline="true" label-width="138px">
        <el-form-item v-for="query in queryParams" :key="query.prop" :label="query.label" :prop="query.prop">
            <template v-if="query.needDictionary">
                <!-- 字典类型 -->
                <select-option :selectConfig="query.needDictionary" v-model="query.val" />
            </template>
            <template v-else-if="query.type === 'time'">
                <!-- 日期类型 -->
                <time-picker v-model="query.val" />
            </template>
            <template v-else>
                <el-input v-model="query.val" :placeholder="`请输入${query.label}`" clearable style="width: 240px" />
            </template>
        </el-form-item>

        <el-row :gutter="10" class="mb8">
            <el-form-item>
                <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
            <el-col v-if="addAciton" :span="1.5">
                <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
            </el-col>
            <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
    </el-form>
    <!-- <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
        </el-col>
        <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" @click="handleUpdate">修改</el-button>
        </el-col>
        <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" @click="handleDelete">删除</el-button>
        </el-col>
        <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->
</template>
<script setup neam="TableHeaderSearch">
import SelectOption from './SelectOption.vue'
import TimePicker from './TimePicker.vue'

const emit = defineEmits(['handleQuery', 'handleAdd', 'resetQuery'])
const props = defineProps({
    // 查询条件数据
    queryParams: {
        type: Array,
        default: () => [],
    },
    // 是否显示表头的 添加按钮
    addAciton: { type: Boolean, default: () => true },
})
const showSearch = ref(true) // 是否显示查询条件

// 添加
function handleAdd() {
    emit('handleAdd')
}
// 重置
function resetQuery() {
    emit('resetQuery')
}
/** 搜索按钮操作 */
function handleQuery() {
    emit('handleQuery')
}
// 刷新
function getList() {
    handleQuery()
}
</script>

<style scoped lang="scss">
:deep(.el-form-item__content) {
    .el-input,
    .el-select {
        width: 200px !important;
    }
}
</style>
