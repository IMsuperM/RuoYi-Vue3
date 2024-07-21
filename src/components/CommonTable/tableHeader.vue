<template>
  <el-form :model="queryParams" ref="queryRef" v-show="showSearch" :inline="true" label-width="68px">
    <el-form-item label="合作机构代码" prop="partnerCode">
      <el-input v-model="queryParams.partnerCode" placeholder="请输入角色名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
    </el-form-item>
    <el-form-item label="合作机构名称" prop="partnerName">
      <el-input v-model="queryParams.partnerName" placeholder="请输入权限字符" clearable style="width: 240px" @keyup.enter="handleQuery" />
    </el-form-item>
    <!-- <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="角色状态" clearable style="width: 240px">
                    <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label"
                        :value="dict.value" />
                </el-select>
            </el-form-item> -->
    <el-form-item label="创建时间" style="width: 308px">
      <el-date-picker v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
      <el-button icon="Refresh" @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>
  <el-row :gutter="10" class="mb8">
    <el-col :span="1.5">
      <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:role:add']">新增</el-button>
    </el-col>
    <el-col :span="1.5">
      <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate" v-hasPermi="['system:role:edit']">修改</el-button>
    </el-col>
    <el-col :span="1.5">
      <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:role:remove']">删除</el-button>
    </el-col>
    <el-col :span="1.5">
      <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['system:role:export']">导出</el-button>
    </el-col>
    <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
  </el-row>
</template>
<script setup>
const props = defineProps({
     // 表头数据
     queryParams: {
      type: Array,
      default: () => []
    },
})

</script>

<style scoped lang="scss"></style>
