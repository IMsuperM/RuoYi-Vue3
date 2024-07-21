<template>
    <el-form :model="queryParams" v-show="showSearch" ref="queryRef" :inline="true" label-width="168px">
        <el-row :gutter="20" class="mb8">
            <el-col :span="24">
                <el-form-item v-for="query in queryParams" :key="query.prop" :label="query.label" :prop="query.prop">
                    <el-input v-model="query.val" :placeholder="`请输入${query.label}`" clearable style="width: 240px" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="10" class="mb8">
            <el-form-item>
                <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-row>
    </el-form>
    <el-row :gutter="10" class="mb8">
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
    </el-row>
</template>
<script setup neam="TableHeaderSearch">
    const emit = defineEmits(['handleQuery'])
    const props = defineProps({
        // 表头数据
        queryParams: {
            type: Array,
            default: () => []
        }
    })
    const showSearch = ref(true)

    // 重置
    function resetQuery() {
        props.queryParams.map((q) => {
            return (q.val = '')
        })
    }
    /** 搜索按钮操作 */
    function handleQuery() {
        emit('handleQuery')
    }

    // 刷新
    function getList(){
        resetQuery()
        handleQuery()
    }
</script>

<style scoped lang="scss"></style>
