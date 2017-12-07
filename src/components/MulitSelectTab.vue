<template>
  <div class="muti-select-tab">
    <MulitSelectPanel :option="option"
      :selectedIndex.sync="selectedIndexes.first"
      @selectChange="setFirstSeletion"
      level="first" />
    <MulitSelectPanel :option="option[firstTypeIndex].children"
      :selectedIndex.sync="selectedIndexes.second"
      level="second" />
    <SelectorPanelMulti :option="multiSelectOption.length === 2?multiSelectOption[secondTypeIndex]:multiSelectOption"
      @waterTypeChange="getWaterTypes" />
    <el-button type="primary"
      icon="el-icon-arrow-right"
      @click="sendToResult"
      round
      :disabled="cannotSend"></el-button>
    <!-- <i class="el-icon-arrow-right to-result"></i> -->
    <SelectorPanelResult :option="result" />
  </div>
</template>

<script>
import MulitSelectPanel from './MulitSelectPanel'
import SelectorPanelMulti from './SelectorPanelMulti'
import SelectorPanelResult from './SelectorPanelResult'

export default {
  components: {
    MulitSelectPanel,
    SelectorPanelMulti,
    SelectorPanelResult
  },
  created() {
    this.$root.bus.$on('chartCreated', value => {
      this.result = []
    })
  },
  props: {
    option: {
      type: Array
    },
    multiSelectOption: {
      type: Array
    }
  },
  data() {
    return {
      selectedIndexes: {
        first: -1,
        second: -1
      },
      waterTYpes: [],
      result: []
    }
  },
  methods: {
    setFirstSeletion() {
      this.selectedIndexes.second = -1
    },
    getWaterTypes(types) {
      this.waterTYpes = types
    },
    sendToResult() {
      this.waterTYpes.forEach(value => {
        this.result.push({
          areaType: this.selectedValues.first,
          areaName: this.selectedValues.second,
          waterType: value
        })
      })

      this.clearSelection()
      this.$root.bus.$emit('selectionComplete')
    },
    clearSelection() {
      this.selectedIndexes = {
        first: -1,
        second: -1
      }
      this.waterTYpes = []
    }
  },
  computed: {
    firstTypeIndex() {
      return this.selectedIndexes.first === -1 ? 0 : this.selectedIndexes.first
    },
    secondTypeIndex() {
      return this.selectedIndexes.first === 2 ? 1 : 0
    },
    multiSelectOptionObj() {
      //  初始不响应？
      // return this.multiSelectOption
      if (this.multiSelectOption.length === 2) {
        return this.multiSelectOption[this.secondTypeIndex]
      } else if (this.multiSelectOption.length === 1) {
        return this.multiSelectOption
      }
    },
    selectedValues() {
      let firstValue = this.selectedIndexes.first === -1 ? '' : this.option[this.selectedIndexes.first].value
      let secondValue = this.selectedIndexes.second === -1 ? '' : this.option[this.firstTypeIndex].children[this.selectedIndexes.second].value

      return {
        first: firstValue,
        second: secondValue
      }
    },
    cannotSend() {
      return this.selectedIndexes.first === -1 || this.selectedIndexes.second === -1 || this.waterTYpes.length === 0
    }
  },
  watch: {
    result(value) {
      this.$root.bus.$emit('resultChange', value)
    }
  }
}
</script>

<style scoped>
.muti-select-tab {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
