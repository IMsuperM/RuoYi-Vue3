<template>
  <el-table ref="customTable" :class="{ empty: data.length === 0 }" :data="data" :header-cell-style="headerCellStyle" :max-height="maxHeight" :border="border" :row-key="rowKey" @selection-change="selectionChange">
    <el-table-column v-if="hasIndex" type="index" :fixed="indexFixed" :align="textAlign" :label="indexLabel"></el-table-column>
    <el-table-column v-if="hasSelection" type="selection" :fixed="selectionFixed" :align="textAlign" :selectable="setSelectAble"></el-table-column>
    <!-- 表头 -->
    <el-table-column v-for="item in tableHeader" :key="item.prop" :prop="item.prop" :label="item.label">
      <!-- <template slot-scope="scope">
        <div class="overflow-text" @mouseenter="tableCellEnter" @mouseleave="tableCellMouseLeave">
          <slot v-if="item.type" name="tableData" :scope="{ ...scope, prop: item.prop }" />
          <span v-else>{{ scope.row[item.scope] }}</span>
        </div>
      </template> -->
    </el-table-column>
    <el-table-column v-if="hasOperation" label="操作" fixed="right" :align="textAlign" :width="operationWidth">
        <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" @click="handleUpdate">修改</el-button>
        </el-col>
        <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" @click="handleDelete">删除</el-button>
        </el-col>
    </el-table-column>

  </el-table>
</template>
<script setup name="CommonTable">
const { proxy } = getCurrentInstance()
  const props = defineProps({
    // 表头数据
    tableHeader: {
      type: Array,
      default: () => []
    },
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    // 表头样式
    headerCellStyle: {
      type: Object,
      default: () => {
        return { color: '#909399', background: '#F7F8FA', 'font-weight': 'normal' }
      }
    },
    hasSelection: {
      type: Boolean,
      default: false
    },
    hasIndex: {
      type: Boolean,
      default: false
    },
    // 列表序号表头
    indexLabel: String,
    // 是否有表格最右边操作列
    hasOperation: {
      type: Boolean,
      default: true
    },
    // 操作列的宽度
    operationWidth: {
      type: [String, Number],
      default: '220px'
    },
    // 表格中内容对齐方式
    textAlign: '',
    // 选中项回显数组
    defaultSelection: {
      type: Array,
      default: () => []
    },
    // 勾选时匹配的标识key
    selectKey: {
      type: String,
      default: 'id'
    },
    maxHeight: {
      type: [String, Number],
      default: 'none'
    },
    border: {
      type: Boolean,
      default: false
    },
    // 设置勾选禁用时 表格数据做判断的key
    selectDisableKey: {
      type: String,
      default: ''
    },
    tipPlacement: {
      type: String,
      default: 'top'
    },
    indexFixed: {
      type: [String, Boolean],
      default: false
    },
    selectionFixed: {
      type: [String, Boolean],
      default: false
    },
    rowKey: {
      type: String,
      default: ''
    },
    setSelecTable: Function
  })
  const tableSelection = ref([])

  // 设置回显默认勾选行的方法
  function setDefaultSelection(arr = this.defaultSelection) {
    this.data.forEach((item) => {
      const flag = arr.some((s_item) => s_item[this.selectKey] === item[this.selectKey])
      this.$refs.customTable.toggleRowSelection(item, flag)
    })
  }
  // 列表当前选中的行, this.$refs[表格组件名].tableSelection 获取
  function selectionChange(s) {
    this.tableSelection = s
    this.$emit('tableSelectionChange')
  }
  function clearSelection() {
    this.$refs.customTable.clearSelection()
  }
  // 有勾选框时 设置每行勾选禁用状态
  function setSelectAble(row, i) {
    if (this.setSelecTable) {
      return this.setSelecTable(row, i)
    }
    const selectData = this.defaultSelection.find((item) => item[this.selectKey] === row[this.selectKey])
    if (!selectData) return true
    return !selectData[this.selectDisableKey]
  }
  function customWidth(item) {
    if (item.charLength) {
      return item.charLength * 14 + 20
    }
    return 110
  }
</script>

<style scoped lang="scss">
  $scrollbar: 8px;

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

  .cell-popover {
    position: fixed;
    top: 100vh;
    left: 0;
    background: #303133;
    max-width: 40vw;
    width: max-content;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
    z-index: 2000;
    color: #fff;
    line-height: 1.2;
    text-align: justify;
    font-size: 12px;
    word-wrap: break-word;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
    --custom-left: calc(50% - 5px);

    &.show-popover {
      opacity: 1;
    }

    &::after {
      content: ' ';
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-top-color: #303133;
      bottom: -5px;
      border-width: 5px;
      border-bottom-width: 0;
      position: absolute;
      // left: calc(50% - 5px);
      left: var(--custom-left);
    }
  }
</style>
