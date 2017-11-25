<template>
  <div class="selector-panel">
    <div class="selector-header">
      <el-checkbox :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange">全选</el-checkbox>
    </div>
    <el-checkbox-group v-model="checkedWaterTypes"
      @change="handleCheckedWaterTypesChange">
      <ol>
        <li class="selector-item"
          :class="{selected:index===selectedIndex}"
          v-for="(item,index) in option"
          :key="item.label">
          <el-checkbox :label="item.value">{{item.label}}</el-checkbox>
        </li>
      </ol>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Array
    }
  },
  data() {
    return {
      checkAll: false,
      selectedIndex: -1,
      checkedWaterTypes: []
    }
  },
  computed: {
    allWaterTypes() {
      let waterTypes = []
      this.option.forEach((item) => {
        waterTypes.push(item.value)
      })
      return waterTypes
    },
    isIndeterminate() {
      let checkedTypeNum = this.checkedWaterTypes.length
      return !(checkedTypeNum === 0 || checkedTypeNum === this.allWaterTypes.length)
    }
  },
  created() {
    this.$root.bus.$on('selectionPanelChange', (value) => {
      this.clearSelection()
    })
    this.$root.bus.$on('selectionComplete', (value) => {
      this.clearSelection()
    })
  },
  methods: {
    setSelect(index, value) {
      this.selectedIndex = this.selectedIndex === index ? -1 : index
      this.$emit('selectChange', value, index)
    },
    handleCheckAllChange(val) {
      this.checkedWaterTypes = val ? this.allWaterTypes : []
      this.$emit('waterTypeChange', this.checkedWaterTypes)
    },
    handleCheckedWaterTypesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.allWaterTypes.length
      this.$emit('waterTypeChange', this.checkedWaterTypes)
    },
    clearSelection() {
      this.checkedWaterTypes = []
    }
  }
}
</script>

<style scoped>
.selector-header {
  background: rgba(0, 188, 212, 0.08);
  text-align: left;
  padding-left: 15px;
}
.selector-header .el-checkbox__label {
  font-size: 16px;
  font-weight: bold;
  line-height: 2;
}
.selector-panel {
  display: inline-block;
  height: 40vh;
  width: 13vw;
  margin: 0 5px;
  border: 1px solid #e6ebf5;
  border-radius: 5px;
  box-sizing: border-box;
}
.selector-panel ol {
  list-style: none;
  padding-left: 0;
}

.selector-item {
  text-align: left;
}
.selector-item:hover {
  cursor: pointer;
  background-color: #f5f7fa;
}
.selector-item.selected {
  color: #409eff;
}
.selector-item .el-checkbox {
  padding-left: 15px;
}
</style>
