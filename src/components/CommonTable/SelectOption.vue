<template>
    <!-- 字典类型 -->
    <el-select v-model="slValue" placeholder="请选择" :filterable="selectConfig.filterable">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
</template>
<script setup name="SelectOption">
import { getDictionary } from '@/api/config'
const emit = defineEmits(['update:selectValue'])
const props = defineProps({
    // 下拉项配置
    selectConfig: {
        type: Object,
        default: () => {},
    },
    // 绑定的值
    selectValue: { type: String, default: () => '' },
})

const slValue = computed({
    get() {
        return props.selectValue
    },
    set(value) {
        emit('update:selectValue', value)
    },
})
const options = ref([])

// 初始化字典项 有的需要查询接口获取的
async function initSelectOption() {
    const { selectConfig } = props
    if(selectConfig.options){
        options.value = selectConfig.options
        return
    }
    if (selectConfig.code) {
        try {
            const res = await getDictionary(selectConfig.code)
            const { data } = res
            if (data) {
                options.value = data.map(d => {
                    return { label: d[selectConfig.codeName], value: d[selectConfig.codeValue] }
                })
            }
        } catch (error) {
            options.value = {}
        }
    }
}

onMounted(() => {
    initSelectOption()
})
</script>

<style scoped lang="scss"></style>
