<template>
  <aside class="sider">
    <el-tabs type="border-card">
      <el-tab-pane label="用水量">
        <el-form :label-position="labelPosition" label-width="85px" :model="formLabelAlign" size="mini">
          <el-form-item label="用水量">
            <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions" @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="开始年份">
            <el-date-picker v-model="form.startYear" type="year" placeholder="选择年" value-format="yyyy">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束年份">
            <el-date-picker v-model="form.endYear" type="year" placeholder="选择年" value-format="yyyy">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="用水量指标">
        <el-form :label-position="labelPosition" label-width="85px" :model="formLabelAlign" size="mini">
          <el-form-item label="用水量指标">
            <el-cascader expand-trigger="hover" :options="zbOptions" v-model="zbSelectedOptions" @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="开始年份">
            <el-date-picker v-model="form.stratYear" type="year" placeholder="选择年" value-format="yyyy">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束年份">
            <el-date-picker v-model="form.endYear" type="year" placeholder="选择年" value-format="yyyy">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitZBForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-radio-group v-model="radio" size="mini" @change="changeMap(radio)">
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
export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      form: {
        type: '',
        year: '',
        startYear: '',
        endYear: ''
      },
      radio: '',
      selectedOptions: [],
      options: [
        {
          value: 'quanshi',
          label: '全市水量',
          children: [
            {
              value: 'line',
              label: '折线图'
            },
            {
              value: 'bar',
              label: '分类比例图'
            }
          ]
        },
        {
          value: 'fenqu',
          label: '供水分区水量',
          children: [
            {
              value: 'shishu',
              label: '市属',
              children: [
                {
                  value: 'line',
                  label: '折线图'
                },
                {
                  value: 'bar',
                  label: '分类比例图'
                }
              ]
            },
            {
              value: 'jiaoqu',
              label: '郊区',
              children: [
                {
                  value: 'line',
                  label: '折线图'
                },
                {
                  value: 'bar',
                  label: '分类比例图'
                }
              ]
            },
            {
              value: 'slbl',
              label: '水量比例',
              children: [
                {
                  value: 'max-server',
                  label: '最高日供水量'
                },
                {
                  value: 'avg-server',
                  label: '日均供水量'
                },
                {
                  value: 'avg-use',
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
      ],
      zbSelectedOptions: [],
      zbOptions: [
        {
          value: 'quanshi',
          label: '全市用水量指标'
          // children: [
          //   {
          //     value: 'line',
          //     label: '折线图'
          //   },
          //   {
          //     value: 'bar',
          //     label: '分类比例图'
          //   }
          // ]
        },
        // {
        //   value: 'fenqu',
        //   label: '供水分区用水量指标',
        //   children: [
        //     {
        //       value: 'shishu',
        //       label: '市属',
        //       children: [
        //         {
        //           value: 'line',
        //           label: '折线图'
        //         },
        //         {
        //           value: 'bar',
        //           label: '分类比例图'
        //         }
        //       ]
        //     },
        //     {
        //       value: 'jiaoqu',
        //       label: '郊区',
        //       children: [
        //         {
        //           value: 'line',
        //           label: '折线图'
        //         },
        //         {
        //           value: 'bar',
        //           label: '分类比例图'
        //         }
        //       ]
        //     },
        //     {
        //       value: 'slbl',
        //       label: '水量比例',
        //       children: [
        //         {
        //           value: 'max-server',
        //           label: '最高日供水量'
        //         },
        //         {
        //           value: 'avg-server',
        //           label: '日均供水量'
        //         },
        //         {
        //           value: 'avg-use',
        //           label: '日均用水量'
        //         }
        //       ]
        //     }
        //   ]
        // },
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
</style>
