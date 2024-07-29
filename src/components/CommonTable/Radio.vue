<template>
    <el-radio-group v-model="slValue" :disabled="disabled">
        <el-radio v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</el-radio>
    </el-radio-group>
</template>
<script setup name="Radio">
import { getDictionary } from '@/api/config'
const props = defineProps({
    // 下拉项配置
    selectConfig: {
        type: Object,
        default: () => {},
    },
    // 传入的默认中文名
    defaultName: { type: String, default: () => '' },
    // disable
    disabled: { type: Boolean, default: () => false},
})
// 使用v-model的 跟父级的双向绑定
const slValue = defineModel()
// 选项内容
const options = ref([])


// 初始化字典项 有的需要查询接口获取的
async function initSelectOption() {
    const { selectConfig } = props
    if (selectConfig.options) {
        options.value = selectConfig.options
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
            options.value = []
        }
    }

    if (props.defaultName) {
        // 匹配相应的值
        const target = options.value.find(o => o.label == props.defaultName)
        target && (slValue.value = target.value)
    }
}

onBeforeMount(() => {
    initSelectOption()
})
</script>

<style scoped lang="scss">
.el-select {
    width: 200px;
}
</style>
