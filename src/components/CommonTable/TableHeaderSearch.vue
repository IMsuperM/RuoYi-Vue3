<template>
    <el-form :model="queryParams" v-show="showSearch" ref="queryRef" :inline="true" label-width="138px">
        <el-form-item v-for="query in queryParams" :key="query.prop" :label="query.label" :prop="query.prop">
            <template v-if="query.needDictionary">
                <!-- 字典类型 -->
                <select-option :selectConfig="query.needDictionary" v-model="query.val" @set-default-value="setDefaultValue" />
            </template>
            <template v-else-if="query.type === 'time'">
                <!-- 日期类型 -->
                <time-picker v-model="query.val" />
            </template>
            <template v-else>
                <el-input v-model="query.val" :placeholder="`请输入${query.label}`" clearable style="width: 240px" />
            </template>
        </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
        <template v-if="showSearch">
            <el-button type="primary" size="small" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" size="small" @click="resetQuery">重置</el-button>
            <el-button v-if="addAciton" type="primary" size="small" plain icon="Plus" @click="handleAdd">新增</el-button>
            <el-button v-if="uploadAciton" type="warning" size="small" plain icon="Download" @click="handleUpload">导入</el-button>
            <el-button v-if="deletAciton" type="danger" size="small" plain icon="Delete" @click="handleDelete">删除</el-button>
        </template>
        <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
</template>
<script setup neam="TableHeaderSearch">
import SelectOption from './SelectOption.vue'
import TimePicker from './TimePicker.vue'

const emit = defineEmits(['handleQuery', 'handleAdd', 'resetQuery', 'handleUpload', 'handleDelete'])
const props = defineProps({
    // 查询条件数据
    queryParams: {
        type: Array,
        default: () => [],
    },
    // 是否显示表头的 添加按钮
    addAciton: { type: Boolean, default: () => false },
    // 是否显示表头的 导入按钮
    uploadAciton: { type: Boolean, default: () => false },
    // 是否显示表头的 删除按钮
    deletAciton: { type: Boolean, default: () => false },
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
// 导入
function handleUpload() {
    emit('handleUpload')
}
// 删除
function handleDelete() {
    emit('handleDelete')
}

// 设置默认值成功
function setDefaultValue() {
    handleQuery()
}

onMounted(() => {
    handleQuery()
})
</script>

<style scoped lang="scss">
:deep(.el-form-item__content) {
    .el-input,
    .el-select {
        width: 200px !important;
    }
}
</style>
