<template>
    <!--时间选择 -->
    <el-date-picker v-model="dateValue" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
</template>
<script setup name="TimePicker">
const emit = defineEmits(['update:value'])
const props = defineProps({
    // 配置
    config: {
        type: Object,
        default: () => {},
    },
    // 绑定的值
    value: { type: String, default: () => '' },
})

const dateValue = computed({
    get() {
        return props.value
    },
    set(value) {
        console.log("set ~ value:", value);
        emit('update:value', value)
    },
})
</script>

<style scoped lang="scss"></style>
