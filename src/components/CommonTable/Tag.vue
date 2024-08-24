<template>
    <el-tag v-if="label" :type="type ? 'primary':'warning'">{{ label }}</el-tag>
    <span v-else>{{ label }}</span>
</template>

<script setup name="Tag">
import useSelectDictStore from '@/store/modules/selectDictionary'
const props = defineProps({
    // 下拉项配置
    item: {
        type: Object,
        default: () => {}
    },
    val: {
        type: String,
        default: () => ''
    }
})
const type = ref(true)
const label = ref('')
const formatBoolean = async (item, val) => {
    let labelArr = []
    if (item.needDictionary.options) labelArr = item.needDictionary.options
    else {
        // 数据字典从缓存里获取
        let optionsDic = await useSelectDictStore().getDict(item.needDictionary.code)
        if (!optionsDic) optionsDic = await useSelectDictStore().setDict(item.needDictionary.code)
        labelArr = optionsDic
    }

    const target = labelArr.find(l => l.value === val || l.label === val)
    if(target)type.value = target.value === true || target.label === '充值' ? true : false
    label.value = (target && target.label) || ''
}

onBeforeMount(() => {
    formatBoolean(props.item, props.val)
})
</script>

<style scoped lang="scss">
.el-select {
    width: 200px;
}
</style>
