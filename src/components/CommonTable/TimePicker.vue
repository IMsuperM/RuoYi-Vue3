<template>
    <!--时间选择 -->
    <el-date-picker v-model="dateValue" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
</template>

<script setup name="TimePicker">
const props = defineProps({
    // 配置
    config: {
        type: Object,
        default: () => {}
    }
})
// 使用v-model的 跟父级的双向绑定
const dateValue = defineModel()
</script>

<style scoped lang="scss"></style>
