<template>
  <div class="graph"
    :style="{width: '600px'}">
  </div>
</template>

<script>
import echarts from 'echarts'
import { getDailyWater } from '../api/getDailyData'
import { getYearRange, getChartTitle, getChartLegend, getBarChartOpt, getLineChartOpt, getUnit } from '../utils/chart'

function arrayDivide(arr, divideArr) {
  let result = []
  arr.forEach((value, index) => {
    let rstValue = arr[index] / divideArr[index] * 100
    result.push(rstValue.toFixed(2))
  })
  return result
}
function arraySum(arr1, arr2) {
  let result = []
  arr1.forEach((value, index) => {
    let rstValue = arr1[index] + arr2[index]
    result.push(rstValue)
  })
  return result
}
let areaTypeMacth = {
  sh: '全市',
  gsfq: '供水分区',
  xzq: '行政区'
}
let waterTypesMatch = {
  maxUse: '最高日供水量',
  avgSupply: '日均供水量',
  avgUse: '日均用水水量',
  avgIndustryUse: '日均工业用水水量',
  avgCityUse: '日均城镇公共用水量',
  avgCitizenUse: '日均居民生活用水量'
}
export default {
  name: 'graph',
  props: {
    chartParams: {
      type: Object
    },
    id: {
      type: Number
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {

  },
  mounted() {
    this.drawGraph(this.chartParams)
  },
  // 在组件销毁时别忘了解除事件绑定
  beforeDestroy() {
    this.$root.bus.$off('changeGraph')
  },
  methods: {
    drawGraph({ chartType, themeType, startYear, endYear, waterThemes }) {
      let areaTypeStr = areaTypeMacth[waterThemes[0].areaType]

      let chartTitle = getChartTitle(chartType, themeType, areaTypeStr)

      let queryTales = {
        areaTypes: [],
        areaNames: []
      }
      waterThemes.forEach(waterTheme => {
        if (!queryTales.areaNames.includes(waterTheme.areaName)) {
          queryTales.areaNames.push(waterTheme.areaName)
          queryTales.areaTypes.push(waterTheme.areaType)
        }
      })

      let areaTypes = queryTales.areaTypes.join(',')
      let areaNames = queryTales.areaNames.join(',')
      // 基于准备好的dom，初始化echarts实例
      this.$el.style.height = window.innerHeight - 50 + 'px'
      let graph = echarts.init(this.$el)
      this.chart = graph
      let xAxisRange = getYearRange(startYear, endYear)
      getDailyWater(areaTypes, areaNames, themeType, startYear, endYear).then(responese => {
        let data = responese.data
        console.log(data)
        function extract(data) {
          let obj = {}
          data.forEach(item => {
            Object.keys(item).forEach(key => {
              let value = item[key] === null ? '-' : item[key]
              if (obj.hasOwnProperty(key)) {
                obj[key].push(value)
              } else {
                obj[key] = [value]
              }
            })
          })
          return obj
        }

        let tables = {}
        queryTales.areaNames.forEach(item => {
          let dataTable = extract(data[item])
          tables[item] = dataTable
        })

        let chartOption
        if (chartType === 'line') {
          let series = []
          let legends = []
          console.log(waterThemes)
          waterThemes.forEach(waterTheme => {
            let legendStr = getChartLegend(waterTheme.areaName, waterTheme.waterType)

            let nullCount = Number.parseInt(tables[waterTheme.areaName]['time']) - Number.parseInt(startYear)
            let nullArr = Array.from({ length: nullCount }, (v, i) => '-')
            let dataArr = nullArr.concat(tables[waterTheme.areaName][waterTheme.waterType])
            console.log(nullCount)
            console.log(nullArr)
            series.push({
              name: legendStr,
              type: chartType,
              data: dataArr,
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            })
            legends.push(legendStr)
          })

          let unit = getUnit(waterThemes[0]['waterType'])
          chartOption = getLineChartOpt(chartTitle, unit, xAxisRange, legends, series)
        } else if (chartType === 'bar') {
          let type = waterThemes[0].type
          let table = tables[waterThemes[0].areaName]
          let nullCount = Number.parseInt(table['time']) - Number.parseInt(startYear)
          let nullArr = Array.from({ length: nullCount }, (v, i) => '-')

          if (type === 'multiTypeCompare') {
            data = {
              'avgCitizenUse': [],
              'avgCityUse': [],
              'avgIndustryUse': []
            }
            let sumArr = []
            table['avgCitizenUse'].forEach((value, index) => {
              let sum = table['avgCitizenUse'][index] + table['avgCityUse'][index] + table['avgIndustryUse'][index]
              sumArr.push(sum)
            })
            Object.keys(data).forEach(key => {
              data[key] = nullArr.concat(arrayDivide(table[key], sumArr))
            })
          } else {
            data = {
              'ss': [],
              'jq': []
            }
            let arrData = []
            waterThemes.forEach(waterTheme => {
              arrData.push(tables[waterTheme.areaName][waterTheme.waterType])
            })
            let sumArr = arraySum(arrData[0], arrData[1])
            data['ss'] = nullArr.concat(arrayDivide(arrData[0], sumArr))
            data['jq'] = nullArr.concat(arrayDivide(arrData[1], sumArr))

            chartTitle = `上海市供水分区${waterTypesMatch[waterThemes[0].waterType]}对比图`
          }

          chartOption = getBarChartOpt(chartTitle, type, xAxisRange, data)
        }

        graph.setOption(chartOption)
      })
    }
  }
}
</script>

<style>

</style>
