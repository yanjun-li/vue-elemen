<template>
  <div>
    <div id="map-chart"
      :style="{width: width, height: height}">
    </div>
    <el-radio-group v-model="lineType"
      class="lineSelector">
      <el-radio label="sh">行政区边界</el-radio>
      <el-radio label="newCity">新市镇边界</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import echarts from 'echarts'
import { jzJson } from '../api/jz'
import { gyJson } from '../api/gy'
import { getMapChartOpt, getLineData } from '../utils/chart'
import { getJZWater } from '../api/getDailyData'
import { getJZIndicator, getGYIndicator } from '../api/getMapData.js'

export default {
  name: 'mapChart',
  props: {
    chartParams: {
      type: Object
    }
  },
  data() {
    return {
      chart: '',
      lineType: 'sh',
      chartOption: null,
      width: '',
      height: ''
    }
  },
  mounted() {
    this.drawMap()
    window.onresize = () => {
      let mapWrap = document.getElementById('map-chart')
      mapWrap.style.width = `${window.innerWidth - 320}px`
      mapWrap.style.height = `${window.innerHeight - 50}px`
      // this.chart.resize({
      //   width: `${window.innerWidth - 320}px`,
      //   height: `${window.innerHeight - 50}px`
      // })
      this.chart.resize()
    }
  },
  created() {
    this.$root.bus.$on('changeMap', (themeType, mapType) => {
      this.changeMap(themeType, mapType)
    })
  },
  watch: {
    lineType: function (newLineType) {
      let lines = getLineData(newLineType)
      this.chartOption.series[0].data = lines
      this.chart.setOption(this.chartOption)
    }
  },
  methods: {
    drawMap() {
      // 基于准备好的dom，初始化echarts实例
      let themeType = '用水量'
      let waterType = '3'
      let mapType = 'JZ'
      let mapWrap = document.getElementById('map-chart')
      mapWrap.style.width = `${window.innerWidth - 320}px`
      mapWrap.style.height = `${window.innerHeight - 50}px`
      let mapChart = echarts.init(mapWrap)
      this.chart = mapChart

      // Promise.all([getMapGeojson(), getMapData()])
      //   .then(value => {
      //     console.log(value)
      //   })
      let lines = getLineData(this.lineType)

      getJZWater(waterType).then(responese => {
        let chartData = responese.data

        echarts.registerMap(mapType, jzJson)
        // 绘制图表
        this.chartOption = getMapChartOpt(waterType, themeType, mapType, chartData, lines)
        this.chart.setOption(this.chartOption, true)
      })
    },
    changeMap(themeType, waterType) {
      let geoJson
      let mapType
      if (waterType === 'avgIndustryUseIndicator') {
        geoJson = gyJson
        mapType = 'GY'
      } else {
        geoJson = jzJson
        mapType = 'JZ'
      }
      let lines = getLineData(this.lineType)
      if (themeType === '用水量') {
        getJZWater(waterType).then(responese => {
          let chartData = responese.data
          echarts.registerMap(mapType, geoJson)
          this.chartOption = getMapChartOpt(waterType, themeType, mapType, chartData, lines)
          this.chart.setOption(this.chartOption, true)
        })
      } else if (waterType !== 'avgIndustryUseIndicator') {
        getJZIndicator(waterType).then(responese => {
          let chartData = responese.data
          echarts.registerMap(mapType, geoJson)
          this.chartOption = getMapChartOpt(waterType, themeType, mapType, chartData, lines)
          this.chart.setOption(this.chartOption, true)
        })
      } else {
        getGYIndicator().then(responese => {
          let chartData = responese.data
          chartData = chartData.map(item => {
            if (item.value === 0) {
              return {
                value: '-',
                name: item.name
              }
            } else {
              return item
            }
          })
          echarts.registerMap(mapType, geoJson)
          this.chartOption = getMapChartOpt(waterType, themeType, mapType, chartData, lines)
          this.chart.setOption(this.chartOption, true)
        })
      }
    }
  }
}
</script>

<style>
.lineSelector {
  position: absolute;
  top: 5vh;
  right: 5vw;
  border-radius: 5px;
  padding: 5px 10px;
}
.lineSelector .el-radio {
  display: block;
  margin: 5px 0;
}
.lineSelector .el-radio + .el-radio {
  margin: 0;
}
</style>
