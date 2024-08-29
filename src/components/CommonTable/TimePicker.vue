<template>
    <!--时间选择 -->
    <el-date-picker v-model="dateValue" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
</template>

<script setup name="TimePicker">
const props = defineProps({
    // 配置
    initDay: {
        type: Number,
        default: () => 0
    }
})
// 使用v-model的 跟父级的双向绑定
const dateValue = defineModel()

/**
 * 设置默认时间
 */
function getTimeFn() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * props.initDay)
    const startTime = formatDate(start)
    const endTime = formatDate(end)
    dateValue.value = [startTime, endTime]
}
/**
 * 格式化时间
 */
function formatDate(date) {
    let myyear = date.getFullYear()
    let mymonth = date.getMonth() + 1
    let myweekday = date.getDate()

    if (mymonth < 10) {
        mymonth = '0' + mymonth
    }
    if (myweekday < 10) {
        myweekday = '0' + myweekday
    }
    return myyear + '-' + mymonth + '-' + myweekday
}
onMounted(() => {
    console.log("onMounted ~ props.initDay:", props.initDay);

    props.initDay && getTimeFn()
})
</script>

<style scoped lang="scss"></style>
