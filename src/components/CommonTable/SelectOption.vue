<template>
    <!-- 字典类型 -->
    <el-select v-model="slValue" placeholder="请选择" :filterable="selectConfig.filterable">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
</template>
<script setup>
import { getDictionary } from '@/api/partners'
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

async function initSelectOption() {
    const { selectConfig } = props
    if (selectConfig.code) {
        const res = await getDictionary(selectConfig.code)
        const { data } = res
        if (data) {
            options.value = data.map((d) => {
                return { label: d[selectConfig.codeName], value: d[selectConfig.codeValue] }
            })
        }
    } else {
        options.value = selectConfig.options
    }
}

onMounted(() => {
    initSelectOption()
})
</script>

<style scoped lang="scss"></style>
