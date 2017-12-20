<template>
  <aside class="sider">
    <el-tabs type="border-card"
      v-model="themeType">
      <el-tab-pane label="用水量"
        name="用水量"
        style="height:100%;">
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
                <MulitSelectTab :option="waterTypeOption"
                  :multiSelectOption="waterMultiTypeOption" />
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
        <div class="cutting">
          街镇日均水量
        </div>
        <div class="map-select">
          <el-radio-group v-model="waterForm.mapRadio"
            size="mini"
            @change="changeMap(waterForm.mapRadio)">
            <el-radio label="3"
              border>售水总量</el-radio>
            <el-radio label="4"
              border>工业用水</el-radio>
            <el-radio label="5"
              border>城镇公共用水</el-radio>
            <el-radio label="6"
              border>居民生活用水</el-radio>
          </el-radio-group>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用水量指标"
        name="用水量指标">
        <el-form :label-position="labelPosition"
          label-width="85px"
          :model="waterIndicatorForm"
          size="mini">
          <el-form-item label="用水量指标">
            <el-button type="text"
              @click="waterIndicatorDialogVisible = true">选择类型</el-button>
            <el-dialog title="图表主题选择"
              :visible.sync="waterIndicatorDialogVisible">
              <MulitSelectTab :option="waterIndicatorTypeOption"
                :multiSelectOption="waterIndicatorMultiTypeOption" />
              <div slot="footer"
                class="dialog-footer">
                <el-button @click="clearLineSelection">取 消</el-button>
                <el-button type="primary"
                  @click="comfirmLineSelection">确 定</el-button>
              </div>
            </el-dialog>
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
        <div class="cutting">
          街镇、工业区日均水量指标
        </div>
        <div class="map-select">
          <el-radio-group v-model="waterIndicatorForm.mapRadio"
            size="mini"
            @change="changeMap(waterIndicatorForm.mapRadio)">
            <el-radio label="avgCitizenUseIndicator"
              border>居民生活用水量指标</el-radio>
            <el-radio label="avgCityUseIndicator"
              border>城镇公共用水量指标</el-radio>
            <el-radio label="avgUseIndicator"
              border>城市综合用水量指标</el-radio>
            <el-radio label="threeIndicator"
              border>三产系数</el-radio>
            <el-radio label="avgIndustryUseIndicator"
              border>工业用地用水量指标</el-radio>
          </el-radio-group>
        </div>

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
function errorAlert(msg, context) {
  context.$alert(msg, '错误提示', {
    confirmButtonText: '确定'
  })
}
export default {
  components: {
    MulitSelectTab
  },
  data() {
    return {
      themeType: '用水量',
      labelPosition: 'right',
      waterForm: {
        radio: 'line',
        mapRadio: '3',
        startYear: '',
        endYear: ''
      },
      waterTypeOption: [
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
      waterMultiTypeOption: [
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
      selectedWaterTheme: [],
      waterDialogVisible: false,
      waterIndicatorDialogVisible: false,
      waterIndicatorForm: {
        radio: 'line',
        mapRadio: '',
        stratYear: '',
        endYear: ''
      },
      waterIndicatorTypeOption: [
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
      waterIndicatorMultiTypeOption: [
        {
          label: '人均居民生活用水指标',
          value: 'avgCitizenUseIndicator'
        }, {
          label: '人均城镇公共用水指标',
          value: 'avgCityUseIndicator'
        }, {
          label: '三产系数',
          value: 'threeIndicator'
        }, {
          label: '人均城市综合用水指标',
          value: 'avgUseIndicator'
        }
      ],
      barOptions: [
        {
          value: 'sh',
          label: '全市水量',
          children: [
            {
              value: '上海',
              label: '上海',
              children: [
                multiTypeCompare
              ]
            }
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
  computed: {
    mapType() {
      if (this.themeType === '用水量') {
        return this.waterForm.mapRadio
      } else {
        return this.waterIndicatorForm.mapRadio
      }
    },
    barParams() {
      if (this.barSelectedOption.includes('multiTypeCompare')) {
        return [{
          type: 'multiTypeCompare',
          areaType: this.barSelectedOption[0],
          areaName: this.barSelectedOption[1],
          waterType: ['avgIndustryUse', 'avgCityUse', 'avgCitizenUse']
        }]
      } else {
        return [
          {
            type: 'multiAreaCompare',
            areaType: 'gsfq',
            areaName: '市属区域',
            waterType: [this.barSelectedOption[2]]
          },
          {
            type: 'multiAreaCompare',
            areaType: 'gsfq',
            areaName: '郊区',
            waterType: [this.barSelectedOption[2]]
          }
        ]
      }
    }
  },
  created() {
    this.$root.bus.$on('resultChange', value => {
      this.selectedWaterTheme = value
    })
  },
  methods: {
    submitForm() {
      // 数据验证
      if ((this.waterForm.radio === 'bar' && this.barSelectedOption.length === 0) || (this.waterForm.radio === 'line' && this.selectedWaterTheme.length === 0)) {
        errorAlert('图表类型不能为空', this)
        return false
      }
      console.log(this.selectedWaterTheme)
      if (this.waterForm.startYear === '') {
        errorAlert('开始年份不能为空', this)
        return false
      }
      if (this.waterForm.endYear === '') {
        errorAlert('结束年份不能为空', this)
        return false
      }
      if (this.waterForm.startYear >= this.waterForm.endYear) {
        errorAlert('开始年份应小于结束年份', this)
        return false
      }
      // 生成图表
      if (this.waterForm.radio === 'line') {
        this.$emit('createChart', {
          chartType: this.waterForm.radio,
          themeType: this.themeType,
          startYear: parseInt(this.waterForm.startYear),
          endYear: parseInt(this.waterForm.endYear),
          waterThemes: this.selectedWaterTheme
        })
      } else {
        this.$emit('createChart', {
          chartType: this.waterForm.radio,
          themeType: this.themeType,
          startYear: parseInt(this.waterForm.startYear),
          endYear: parseInt(this.waterForm.endYear),
          waterThemes: this.barParams
        })
      }
      this.$root.bus.$emit('chartCreated')
    },
    submitZBForm() {
      if (this.waterForm.radio === 'line' && this.selectedWaterTheme.length === 0) {
        errorAlert('图表类型不能为空', this)
        return false
      }
      console.log(this.selectedWaterTheme)
      if (this.waterIndicatorForm.startYear === '') {
        errorAlert('开始年份不能为空', this)
        return false
      }
      if (this.waterIndicatorForm.endYear === '') {
        errorAlert('结束年份不能为空', this)
        return false
      }
      if (this.waterIndicatorForm.startYear >= this.waterIndicatorForm.endYear) {
        errorAlert('开始年份应小于结束年份', this)
        return false
      }
      // 生成图表
      this.$emit('createChart', {
        chartType: 'line',
        themeType: this.themeType,
        startYear: parseInt(this.waterIndicatorForm.stratYear),
        endYear: parseInt(this.waterIndicatorForm.endYear),
        waterThemes: this.selectedWaterTheme
      })
      this.$root.bus.$emit('chartCreated')
    },
    handleChange(value) {
      console.log(value)
    },
    changeMap(value) {
      if (this.themeType === '用水量指标') {
        this.waterForm.mapRadio = ''
      } else {
        this.waterIndicatorForm.mapRadio = ''
      }
      this.$root.bus.$emit('changeMap', this.themeType, this.mapType)
    },
    clearLineSelection() {
      this.selectedWaterTheme = []
      this.waterDialogVisible = false
      this.waterIndicatorDialogVisible = false
    },
    comfirmLineSelection() {
      this.waterDialogVisible = false
      this.waterIndicatorDialogVisible = false
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
.cutting {
  font-size: 14px;
  text-align: left;
  border: 1px solid #e6ebf5;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgba(0, 188, 212, 0.08);
}
.map-select {
  border: 1px solid #e6ebf5;
}
.map-select .el-radio.is-bordered {
  display: block;
  margin-left: 0;
  margin-top: 3px;
}
.map-select .el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 0;
}
.sider .el-tabs__content {
  height: 700px;
}
.map-select {
  /* display: none; */
}
</style>
