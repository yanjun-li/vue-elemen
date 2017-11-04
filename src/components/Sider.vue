<template>
  <aside class="sider">
    <el-tabs type="border-card">
      <el-tab-pane label="用水量">用水量</el-tab-pane>
      <el-tab-pane label="用水量指标">用水量指标</el-tab-pane>
    </el-tabs>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" size="mini">
      <el-form-item label="数据类型">
        <el-select v-model="form.type" placeholder="请选择数据类型">
          <el-option label="用水量" value="water"></el-option>
          <el-option label="用水量指标" value="waterIndex"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用水量">
        <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="用水量指标">
        <el-cascader expand-trigger="hover" :options="zbOptions" v-model="zbSelectedOptions" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="开始年份">
        <el-date-picker v-model="form.stratYear" type="year" placeholder="选择年" end-placeholder="结束年份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束年份">
        <el-date-picker v-model="form.endYear" type="year" placeholder="选择年">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </aside>
</template>

<script>
export default {
  data () {
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
    submitForm () {},
    handleChange (value) {
      console.log(value)
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
</style>
