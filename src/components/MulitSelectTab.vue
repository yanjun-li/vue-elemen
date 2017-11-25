<template>
  <div class="muti-select-tab">
    <MulitSelectPanel :option="option"
      :selectedIndex.sync="selectedIndexes.first"
      @selectChange="setFirstSeletion"
      level="first" />
    <MulitSelectPanel :option="option[firstTypeIndex].children"
      :selectedIndex.sync="selectedIndexes.second"
      level="second" />
    <SelectorPanelMulti :option="lv3Option[secondTypeIndex]"
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
  data() {
    return {
      selectedIndexes: {
        first: -1,
        second: -1
      },
      option: [
        {
          label: '全市',
          value: 'sh',
          children: [
            {
              label: '上海',
              value: '上海'
            }
          ]
        }, {
          label: '供水分区',
          value: 'gsfq',
          children: [
            {
              label: '市属区域',
              value: '市属区域'
            }, {
              label: '郊区',
              value: '郊区'
            }
          ]
        }, {
          label: '行政区',
          value: 'xzq',
          children: [
            { label: '宝山区', value: '宝山区' },
            { label: '崇明区', value: '崇明区' },
            { label: '奉贤区', value: '奉贤区' },
            { label: '嘉定区', value: '嘉定区' },
            { label: '金山区', value: '金山区' },
            { label: '闵行区', value: '闵行区' },
            { label: '浦东北片', value: '浦东北片' },
            { label: '浦东南片', value: '浦东南片' },
            { label: '浦西中心城北四区', value: '浦西中心城北四区' },
            { label: '浦西中心城南四区', value: '浦西中心城南四区' },
            { label: '青浦区', value: '青浦区' },
            { label: '松江区', value: '松江区' }
          ]
        }
      ],
      lv3Option: [
        [
          {
            label: '最高日供水量',
            value: 'maxUse'
          }, {
            label: '日均供水量',
            value: 'avgSupply'
          }, {
            label: '日均用水水量',
            value: 'avgUse'
          }, {
            label: '日均工业用水水量',
            value: 'avgIndustryUse'
          }, {
            label: '日均城镇公共用水量',
            value: 'avgCityUse'
          }, {
            label: '日均居民生活用水量',
            value: 'avgCitizenUse'
          }
        ], [
          {
            label: '日均供水量',
            value: 'avgSupply'
          }, {
            label: '日均用水水量',
            value: 'avgUse'
          }, {
            label: '日均工业用水水量',
            value: 'avgIndustryUse'
          }, {
            label: '日均城镇公共用水量',
            value: 'avgCityUse'
          }, {
            label: '日均居民生活用水量',
            value: 'avgCitizenUse'
          }
        ]
      ],
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
