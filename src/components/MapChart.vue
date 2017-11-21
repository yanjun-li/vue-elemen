<template>
  <div id="map-chart" :style="{width: '600px', height: '700px'}">
  </div>
</template>

<script>
import echarts from 'echarts'
import { getMapData } from '../api/mapData'
import { extract } from '../utils/extract'
import { getMapChartOpt } from '../utils/chart'
import { range } from '../utils/map'

export default {
  name: 'mapChart',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      chart: ''
    }
  },
  mounted() {
    this.drawMap()
  },
  created() {
    this.$root.bus.$on('changeMap', (value) => {
      let type = value
      this.changeMap(type)
    })
  },
  // 在组件销毁时别忘了解除事件绑定
  beforeDestroy() {
    this.$root.bus.$off('changeMap')
  },
  methods: {
    drawMap() {
      let mapType = '街道'
      // 基于准备好的dom，初始化echarts实例
      let mapChart = echarts.init(document.getElementById('map-chart'))
      this.chart = mapChart
      getMapData(mapType).then(responese => {
        let geojson = responese.data
        let chartData = extract(geojson, [0, 200])
        echarts.registerMap('SH', geojson)
        // 绘制图表
        mapChart.setOption({
          backgroundColor: '#404a59',
          title: {
            text: '上海街镇日均用水量（2011）',
            subtext: '数据来自水务规划院',
            sublink: 'http://www.shanghaiwater.gov.cn/shwaterweb/gb/sswj/n55/n102/index.html',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (万立方米)'
          },
          visualMap: {
            pieces: [
              { min: 150 },
              { min: 130, max: 150 },
              { min: 110, max: 130 },
              { min: 90, max: 110 },
              { min: 0, max: 90 }
            ],
            color: ['#d94e5d', '#eac736', '#50a3ba'],
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              name: '上海街镇日均用水量',
              type: 'map',
              roam: true,
              mapType: 'SH', // 自定义扩展图表类型
              data: chartData
            }
          ]
        })
      })
    },
    changeMap(type) {
      let mapType = type === 'industry' ? '工业' : '街道'
      getMapData(mapType).then(responese => {
        let geojson = responese.data
        let chartData = extract(geojson, range[type])
        let mapStr = mapType === '街道' ? 'SH' : 'GY'
        echarts.registerMap(mapStr, geojson)
        let option = getMapChartOpt(type, mapStr, chartData)
        this.chart.setOption(option, true)
      })
    }
  }
}
</script>

<style>

</style>
