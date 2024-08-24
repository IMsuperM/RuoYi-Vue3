<template>
    <!-- 字典类型 -->
    <!-- multipleSelcet 多选-->
    <el-select v-if="selectConfig.multipleSelcet" v-model="slValue" multiple collapse-tags placeholder="请选择" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-else v-model="slValue" placeholder="请选择" :disabled="disabled" :filterable="selectConfig.filterable" @change="change">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
</template>

<script setup name="SelectOption">
import useSelectDictStore from '@/store/modules/selectDictionary'

const emit = defineEmits(['setDefaultValue'])
const props = defineProps({
    // 下拉项配置
    selectConfig: {
        type: Object,
        default: () => {}
    }
})
// 使用v-model的 跟父级的双向绑定
const slValue = defineModel()
// 选项的中文内容
const labelVal = defineModel('optionsLabel')

const disabled = ref(false)
const options = ref([])

function change(op) {
    const target = options.value.find(v => v.value === op)
    labelVal.value = (target && target.label) || ''
}
// 初始化字典项 有的需要查询接口获取的
async function initSelectOption() {
    const { selectConfig } = props
    if (selectConfig.options) {
        options.value = selectConfig.options
        return
    }
    if (selectConfig.code) {
        try {
            // 数据字典从缓存里获取
            let optionsDic = useSelectDictStore().getDict(selectConfig.code)
            if (!optionsDic) optionsDic = await useSelectDictStore().setDict(selectConfig.code)
            if (optionsDic) {
                options.value = optionsDic
            }
            if (selectConfig.label) {
                // TODO 如果有默认值，则赋值相应的code值， 并设置不可选
                let target = options.value.find(item => item.label === selectConfig.label)
                if (target) {
                    slValue.value = target.value
                    disabled.value = true
                    emit('setDefaultValue') // 告知父级 默认值赋值完成
                }
            }
        } catch (error) {
            options.value = {}
        }
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
