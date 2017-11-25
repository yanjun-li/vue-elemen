<template>
  <aside class="sider">
    <el-tabs type="border-card">
      <el-tab-pane label="用水量">
        <el-form :label-position="labelPosition"
          label-width="85px"
          :model="waterForm"
          size="mini">
          <el-form-item label="图表类型">
            <el-radio-group v-model="waterForm.radio">
              <el-radio-button label="line">折线趋势图</el-radio-button>
              <el-radio-button label="bar">柱状对比图</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="图表主题">
            <el-cascader expand-trigger="hover"
              :options="barOptions"
              v-model="barSelectedOption"
              @change="handleChange"
              v-if="waterForm.radio==='bar'">
            </el-cascader>
            <template v-else>
              <el-button type="text"
                @click="waterDialogVisible = true">选择类型</el-button>
              <el-dialog title="图表主题选择"
                :visible.sync="waterDialogVisible">
                <mulit-select-tab></mulit-select-tab>
                <div slot="footer"
                  class="dialog-footer">
                  <el-button @click="clearLineSelection">取 消</el-button>
                  <el-button type="primary"
                    @click="comfirmLineSelection">确 定</el-button>
                </div>
              </el-dialog>
            </template>

          </el-form-item>
          <el-form-item label="开始年份">
            <el-date-picker v-model="waterForm.startYear"
              type="year"
              placeholder="选择年"
              value-format="yyyy">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束年份">
            <el-date-picker v-model="waterForm.endYear"
              type="year"
              placeholder="选择年"
              value-format="yyyy">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="用水量指标">
        <el-form :label-position="labelPosition"
          label-width="85px"
          :model="waterIndicatorForm"
          size="mini">
          <el-form-item label="用水量指标">
            <el-cascader expand-trigger="hover"
              :options="zbOptions"
              v-model="zbSelectedOptions"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="开始年份">
            <el-date-picker v-model="waterIndicatorForm.stratYear"
              type="year"
              placeholder="选择年"
              value-format="yyyy">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束年份">
            <el-date-picker v-model="waterIndicatorForm.endYear"
              type="year"
              placeholder="选择年"
              value-format="yyyy">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              @click="submitZBForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-radio-group v-model="waterIndicatorForm.mapRadio"
          size="mini"
          @change="changeMap(waterIndicatorForm.mapRadio)">
          <el-radio-button label="citizen">居民生活</el-radio-button>
          <el-radio-button label="public">城镇公共</el-radio-button>
          <el-radio-button label="city">城市综合</el-radio-button>
          <el-radio-button label="threeRatio">三产系数</el-radio-button>
          <el-radio-button label="industry">工业用地</el-radio-button>
        </el-radio-group>
      </el-tab-pane>
    </el-tabs>
  </aside>
</template>

<script>
import MulitSelectTab from './MulitSelectTab'

let multiTypeCompare = {
  value: 'multiTypeCompare',
  label: '分类用水量比例'
}

export default {
  components: {
    'mulit-select-tab': MulitSelectTab
  },
  data() {
    return {
      labelPosition: 'right',
      waterForm: {
        radio: 'line',
        startYear: '',
        endYear: ''
      },
      selectedWaterTheme: [],
      waterDialogVisible: false,
      waterIndicatorForm: {
        radio: 'line',
        mapRadio: '',
        startYear: '',
        endYear: ''
      },

      barOptions: [
        {
          value: 'sh',
          label: '全市水量',
          children: [
            multiTypeCompare
          ]
        },
        {
          value: 'gsfq',
          label: '供水分区水量',
          children: [
            {
              value: '市属区域',
              label: '市属区域',
              children: [
                multiTypeCompare
              ]
            },
            {
              value: '郊区',
              label: '郊区',
              children: [
                multiTypeCompare
              ]
            },
            {
              value: 'multiAreaCompare',
              label: '水量比例',
              children: [
                {
                  value: 'maxUse',
                  label: '最高日供水量'
                },
                {
                  value: 'avgSupply',
                  label: '日均供水量'
                },
                {
                  value: 'avgUse',
                  label: '日均用水量'
                }
              ]
            }
          ]
        },
        {
          value: 'xzq',
          label: '行政区水量',
          children: [
            { label: '宝山区', value: '宝山区', children: [multiTypeCompare] },
            { label: '崇明区', value: '崇明区', children: [multiTypeCompare] },
            { label: '奉贤区', value: '奉贤区', children: [multiTypeCompare] },
            { label: '嘉定区', value: '嘉定区', children: [multiTypeCompare] },
            { label: '金山区', value: '金山区', children: [multiTypeCompare] },
            { label: '闵行区', value: '闵行区', children: [multiTypeCompare] },
            { label: '浦东北片', value: '浦东北片', children: [multiTypeCompare] },
            { label: '浦东南片', value: '浦东南片', children: [multiTypeCompare] },
            { label: '浦西中心城北四区', value: '浦西中心城北四区', children: [multiTypeCompare] },
            { label: '浦西中心城南四区', value: '浦西中心城南四区', children: [multiTypeCompare] },
            { label: '青浦区', value: '青浦区', children: [multiTypeCompare] },
            { label: '松江区', value: '松江区', children: [multiTypeCompare] }
          ]
        }
      ],
      barSelectedOption: [],
      zbSelectedOptions: [],
      zbOptions: [
        {
          value: 'quanshi',
          label: '全市用水量指标'
        },
        {
          value: 'xzq',
          label: '行政区用水量指标',
          children: [
            {
              value: 'putuo',
              label: '普陀区'
            },
            {
              value: 'jingan',
              label: '静安区'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.$root.bus.$on('resultChange', value => {
      this.selectedWaterTheme = value
    })
  },
  methods: {
    submitForm() {
      this.$root.bus.$emit('changeGraph', { area: this.selectedOptions[0], chartType: this.selectedOptions[1], range: [Number.parseInt(this.form.startYear), Number.parseInt(this.form.endYear)] })
    },
    submitZBForm() {
      this.$root.bus.$emit('changeGraph', this.selectedOptions, this.form.startYear, this.form.endYear)
    },
    handleChange(value) {
      console.log(value)
    },
    changeMap(value) {
      console.log(value)
      this.$root.bus.$emit('changeMap', this.radio)
    },
    clearLineSelection() {
      this.selectedWaterTheme = []
      this.waterDialogVisible = false
    },
    comfirmLineSelection() {
      this.waterDialogVisible = false
    }
  }
}
</script>

<style>
.sider {
  width: 300px;
  height: 100%;
  float: left;
  background-color: #e5e5e5;
}
.sider .form {
  // padding-right:10px;
}
.sider .el-tabs {
  height: 100%;
  overflow: hidden;
}

.el-date-editor {
  width: 100%;
}
</style>
