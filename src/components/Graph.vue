<template>
  <div id="graph" :style="{width: '600px', height: '700px'}">
  </div>
</template>

<script>
import echarts from 'echarts'
import { getLineData } from '../api/lineData'
import { getBarData } from '../api/barData'
import { getBarChartOpt, getYearRange } from '../utils/chart'

export default {
  name: 'graph',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      chart: ''
    }
  },
  mounted() {
    this.drawGraph()
  },
  created() {
    this.$root.bus.$on('changeGraph', (value) => {
      console.log(value)
      let { area, chartType, range } = value
      range = getYearRange(range[0], range[1])
      this.changeGraph(area, chartType, range)
    })
  },
  // 在组件销毁时别忘了解除事件绑定
  beforeDestroy() {
    this.$root.bus.$off('changeGraph')
  },
  methods: {
    drawGraph() {
      let dataType = 'sh'
      // 基于准备好的dom，初始化echarts实例
      let graph = echarts.init(document.getElementById('graph'))
      this.chart = graph
      let range = getYearRange(2012, 2015)
      getLineData(dataType).then(responese => {
        let data = responese.data
        console.log(data)
        let [maxUse, avgSupply, avgUse, industryUse, cityUse, citizenUse] = data
        // 绘制图表
        graph.setOption({
          backgroundColor: '#404a59',
          title: {
            text: '上海全市日均水量',
            subtext: '数据来自水务规划院',
            sublink: 'http://www.shanghaiwater.gov.cn/shwaterweb/gb/sswj/n55/n102/index.html',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          grid: {
            bottom: '15%'
          },
          legend: {
            data: [
              '最高日供水量',
              '日均供水量',
              '日均用水水量',
              '日均工业用水水量',
              '日均城镇公共用水量',
              '日均居民生活用水量'
            ],
            textStyle: {
              color: '#fff'
            },
            bottom: '20px'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} {a}年<br/>{c}(万m<sup>3</sup>)'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: range
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          textStyle: {
            color: '#fff'
          },
          series: [
            {
              name: '最高日供水量',
              type: 'line',
              data: maxUse
            }, {
              name: '日均供水量',
              type: 'line',
              data: avgSupply
            }, {
              name: '日均用水水量',
              type: 'line',
              data: avgUse
            }, {
              name: '日均工业用水水量',
              type: 'line',
              data: industryUse
            }, {
              name: '日均城镇公共用水量',
              type: 'line',
              data: cityUse
            }, {
              name: '日均居民生活用水量',
              type: 'line',
              data: citizenUse
            }
          ]
        })
      })
    },
    changeGraph(area, chartType, range) {
      let dataType = 'sh'
      getBarData(dataType).then(responese => {
        let data = responese.data
        let industryUse = []
        data.cityUse.forEach((val, index) => {
          industryUse.push(100 - val - data.citizenUse[index])
        })
        data.industryUse = industryUse
        console.log(data)
        let title = '全市水量分类用水量比例图'
        let option = getBarChartOpt(title, range, data)
        this.chart.setOption(option, true)
      })
    }
  }
}
</script>

<style>

</style>
