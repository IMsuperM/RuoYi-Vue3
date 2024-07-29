<template>
    <el-table ref="customTable" :class="{ empty: data.length === 0 }" :data="data" :header-cell-style="headerCellStyle" :max-height="maxHeight" :border="border" table-layout="auto" @selection-change="handSelectionChange">
        <el-table-column v-if="hasIndex" type="index" :fixed="indexFixed" :align="textAlign" :label="indexLabel"></el-table-column>
        <el-table-column v-if="hasSelection" type="selection" :fixed="selectionFixed" :align="textAlign" width="35px"></el-table-column>
        <!-- 表头 -->
        <!-- <el-table-column v-for="item in tableHeader" :key="item.prop" :prop="item.prop" :label="item.label"> -->
        <!-- <template slot-scope="scope">
        <div class="overflow-text" @mouseenter="tableCellEnter" @mouseleave="tableCellMouseLeave">
          <slot v-if="item.type" name="tableData" :scope="{ ...scope, prop: item.prop }" />
          <span v-else>{{ scope.row[item.scope] }}</span>
        </div>
      </template> -->
        <el-table-column v-for="item in tableColumn" :key="item.prop" :prop="item.prop" :label="item.label" :width="customWidth(item)" show-overflow-tooltip>
            <template #default="scope">
                <template v-if="item.show">
                    <!-- 正常表格数据 -->
                    <span v-if="item.type === 'normal'">{{ scope.row[item.prop] }}</span>
                    <!-- 插入展示为 Switch开关 -->
                    <el-switch v-if="item.type === 'switch'" v-model="scope.row[item.prop]" :active-value="true" :inactive-value="false" @change="handleStatusChange(scope.row)"></el-switch>
                </template>
            </template>
        </el-table-column>
        <el-table-column v-if="hasOperation" label="操作" fixed="right" :align="textAlign" :width="operationWidth">
            <template #default="scope">
                <el-button link type="primary" size="small" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button link type="primary" size="small" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
                <el-button link type="primary" size="small" icon="InfoFilled" @click="handleRecharge(scope.row)">充值</el-button>
                <!-- <el-tooltip content="修改" placement="top">
                    <el-button link type="primary" size="small" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
                </el-tooltip>
                <el-tooltip content="删除" placement="top">
                    <el-button link type="primary" size="small" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
                </el-tooltip>
                <el-tooltip content="充值" placement="top">
                    <el-button link type="primary" size="small" icon="Star" @click="handleRecharge(scope.row)">充值</el-button>
                </el-tooltip> -->
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup name="CommonTable">
const { proxy } = getCurrentInstance()

const emit = defineEmits(['handleUpdate', 'handleDelete','handleRecharge', 'handleStatusChange', 'handSelectionChange'])
const props = defineProps({
    // 表头数据
    tableHeader: {
        type: Array,
        default: () => [],
    },
    // 表格数据
    data: {
        type: Array,
        default: () => [],
    },
    // 表头样式
    headerCellStyle: {
        type: Object,
        default: () => {
            return { color: '#909399', background: '#F7F8FA', 'font-weight': 'normal' }
        },
    },
    hasSelection: {
        type: Boolean,
        default: false,
    },
    hasIndex: {
        type: Boolean,
        default: false,
    },
    // 列表序号表头
    indexLabel: String,
    // 是否有表格最右边操作列
    hasOperation: {
        type: Boolean,
        default: true,
    },
    // 操作列的宽度
    operationWidth: {
        type: [String, Number],
        default: '180px',
    },
    // 表格中内容对齐方式
    textAlign: '',
    // 选中项回显数组
    defaultSelection: {
        type: Array,
        default: () => [],
    },
    // 勾选时匹配的标识key
    selectKey: {
        type: String,
        default: 'id',
    },
    maxHeight: {
        type: [String, Number],
        default: () => '550px',
    },
    border: {
        type: Boolean,
        default: false,
    },
    // 设置勾选禁用时 表格数据做判断的key
    selectDisableKey: {
        type: String,
        default: '',
    },
    tipPlacement: {
        type: String,
        default: 'top',
    },
    indexFixed: {
        type: [String, Boolean],
        default: false,
    },
    selectionFixed: {
        type: [String, Boolean],
        default: true,
    },
    rowKey: {
        type: String,
        default: '',
    },
    setSelecTable: Function,
})
const tableSelection = ref([])

// 过滤表头列
const tableColumn = computed(() => {
    return props.tableHeader.filter(item => item.show)
})

// 修改
function handleUpdate(row) {
    emit('handleUpdate', row)
}

// 删除
function handleDelete(row) {
    emit('handleDelete', row)
}
// c充值
function handleRecharge(row){
    emit('handleRecharge', row)
}

// switch
function handleStatusChange(row) {
    emit('handleStatusChange', row)
}

// 列表当前选中的行, this.$refs[表格组件名].tableSelection 获取
function handSelectionChange(s) {
    emit('handSelectionChange', s)
}


// 设置回显默认勾选行的方法
function setDefaultSelection(arr = this.defaultSelection) {
    this.data.forEach(item => {
        const flag = arr.some(s_item => s_item[this.selectKey] === item[this.selectKey])
        this.$refs.customTable.toggleRowSelection(item, flag)
    })
}

function clearSelection() {
    this.$refs.customTable.clearSelection()
}
// 有勾选框时 设置每行勾选禁用状态
function setSelectAble(row, i) {
    if (this.setSelecTable) {
        return this.setSelecTable(row, i)
    }
    const selectData = this.defaultSelection.find(item => item[this.selectKey] === row[this.selectKey])
    if (!selectData) return true
    return !selectData[this.selectDisableKey]
}
function customWidth(item) {
    if (item && item.charLength) {
        return item.charLength * 14 + 20
    }
    // return 100
}

</script>

<style scoped lang="scss">
$scrollbar: 8px;
:deep(.el-table__cell) {
    div.cell {
        min-width: 120px;
    }
}
:deep(.el-table--scrollable-x) {
    div {
        &.is-scrolling-right,
        &.is-scrolling-middle,
        &.is-scrolling-left {
            position: initial;

            & ~ .el-table__fixed,
            & ~ .el-table__fixed-right {
                height: calc(100% - $scrollbar) !important;

                .el-table__fixed-body-wrapper {
                    bottom: 0px;
                }
            }
        }
    }
}

:deep(.el-table--scrollable-y) {
    ::-webkit-scrollbar {
        width: $scrollbar !important;
    }

    & > .el-table__header-wrapper {
        width: calc(100% - $scrollbar) !important;
    }

    .el-table__fixed-right {
        right: $scrollbar !important;
    }
}

:deep(.el-table) {
    // div {
    //     // .el-tooltip {
    //     //     text-overflow: ellipsis;
    //     //     -webkit-line-clamp: 2;
    //     //     display: -webkit-box;
    //     //     overflow: hidden;
    //     //     white-space: normal;
    //     //     -webkit-box-orient: vertical;
    //     // }
    // }
    div.cell {
        display: flex;

        .el-checkbox {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }

        .el-button--text span {
            font-weight: normal !important;
        }
    }
}

:deep(.el-table.empty) {
    &::before {
        height: 0 !important;
    }

    .el-table__fixed-right::before,
    .el-table__fixed::before {
        height: 0 !important;
    }
}

.el-table--scrollable-x ::-webkit-scrollbar {
    // el-table__body-wrapper
    height: $scrollbar !important;
}

.el-table__empty-block {
    // height: 233px !important;
    .table-empty-img {
        width: 300px;
        height: auto;
        display: block;
        margin: auto;
    }
}

.overflow-text {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    position: relative;
}
</style>
