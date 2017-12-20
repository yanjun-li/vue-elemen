import * as mapConfig from './map'
import {
  waterTypes
} from './config'
import {
  shLineJson
} from '../api/sh_line'
import {
  newCityLineJson
} from '../api/newcity_line'

let shLineData = shLineJson.features
let newCityLineData = newCityLineJson.features

/**
 * 返回横坐标年限范围
 * @param {number} start
 * @param {number} end
 * @returns {array} arr
 */
function getYearRange(start, end) {
  let arr = []
  for (let i = 0; i <= end - start; i++) {
    arr.push(start + i)
  }
  return arr
}
/**
 * 返回echart所需的linedata格式
 *
 * @param {string} type
 * @returns {Array}
 */
function getLineData(type) {
  let lines = []
  let lineJson
  lineJson = type === 'sh' ? shLineData : newCityLineData
  lineJson.forEach(feature => {
    if (feature.geometry !== null) {
      lines.push({
        coords: feature.geometry.coordinates,
        lineStyle: {
          normal: {
            color: '#000'
          }
        }
      })
    }
  })
  return lines
}

function getUnit(waterType) {
  let unit
  switch (waterType) {
    case 'threeIndicator':
      unit = ''
      break
    case 'avgIndustryUseIndicator':
      unit = '(立方米/平方千米.日)'
      break
    case 'avgCitizenUseIndicator':
      unit = '(升/人.日)'
      break
    case 'avgCityUseIndicator':
      unit = '(升/人.日)'
      break
    case 'avgUseIndicator':
      unit = '(升/人.日)'
      break
    default:
      unit = '(万立方米)'
      break
  }
  return unit
}

function getMapTitle(themeType, watertype) {
  let preTitle = watertype === 'avgIndustryUseIndicator' ? '上海街镇' : '上海'
  return preTitle + mapConfig.title[themeType][watertype]
}

function getChartTitle(chartType, themeType, areaType) {
  let chartName = chartType === 'line' ? '趋势' : '对比'
  return `上海市${themeType}${chartName}图`
}

function getChartLegend(areaType, type) {
  return areaType + waterTypes[type]
}

function getLineChartOpt(title, unit, range, legends, series) {
  let opt = {
    backgroundColor: '#f3f3f3',
    title: {
      text: title,
      subtext: '数据来自水务规划院',
      sublink: 'http://www.shanghaiwater.gov.cn/shwaterweb/gb/sswj/n55/n102/index.html',
      left: 'center',
      textStyle: {
        color: '#000'
      }
    },
    grid: {
      bottom: '15%'
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {
          show: false,
          readOnly: true
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      },
      top: 'bottom',
      orient: 'vertical'
    },
    legend: {
      data: legends,
      textStyle: {
        color: '#000'
      },
      bottom: '10px'
    },
    tooltip: {
      trigger: 'item',
      formatter: `{b} {a}年<br/>{c}(${unit})`
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
      color: '#000'
    },
    series: series
  }
  return opt
}

function getBarChartOpt(title, type, range, data) {
  let legends
  let series
  if (type === 'multiTypeCompare') {
    legends = ['工业', '城镇', '居民']
    series = [{
      name: '工业',
      type: 'bar',
      stack: 'total',
      label: {
        normal: {
          show: true,
          position: 'inside',
          formatter: '{c} %'
        }
      },
      data: data.avgIndustryUse
    }, {
      name: '城镇',
      type: 'bar',
      stack: 'total',
      label: {
        normal: {
          show: true,
          position: 'inside',
          formatter: '{c} %'
        }
      },
      data: data.avgCityUse
    }, {
      name: '居民',
      type: 'bar',
      stack: 'total',
      label: {
        normal: {
          show: true,
          position: 'inside',
          formatter: '{c} %'
        }
      },
      data: data.avgCitizenUse
    }]
  } else {
    legends = ['市属区域', '郊区']
    series = [{
      name: '市属区域',
      type: 'bar',
      stack: 'total',
      label: {
        normal: {
          show: true,
          position: 'inside',
          formatter: '{c} %'
        }
      },
      data: data.ss
    }, {
      name: '郊区',
      type: 'bar',
      stack: 'total',
      label: {
        normal: {
          show: true,
          position: 'inside',
          formatter: '{c} %'
        }
      },
      data: data.jq
    }]
  }
  let opt = {
    backgroundColor: '#f3f3f3',
    title: {
      text: title,
      subtext: '数据来自水务规划院',
      sublink: 'http://www.shanghaiwater.gov.cn/shwaterweb/gb/sswj/n55/n102/index.html',
      left: 'center',
      textStyle: {
        color: '#000'
      }
    },
    grid: {
      bottom: '15%'
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {
          show: false,
          readOnly: true
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      },
      top: 'bottom',
      orient: 'vertical'
    },
    legend: {
      data: legends,
      textStyle: {
        color: '#000'
      },
      bottom: '20px'
    },
    barWidth: '15%',
    barGap: '10%',
    tooltip: {
      trigger: 'item',
      formatter: '{b} {a}<br/>{c}(%)'
    },
    xAxis: {
      type: 'category',
      data: range
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} %'
      },
      max: 100
    },
    textStyle: {
      color: '#000'
    },
    series: series
  }
  return opt
}

function getMapChartOpt(watertype, themeType, mapType, chartData, lines) {
  let opt = {
    backgroundColor: '#f3f3f3',
    title: {
      text: getMapTitle(themeType, watertype),
      subtext: '数据来自水务规划院',
      sublink: 'http://www.shanghaiwater.gov.cn/shwaterweb/gb/sswj/n55/n102/index.html',
      left: 'center',
      textStyle: {
        color: '#000'
      }
    },
    geo: [{
      map: mapType,
      show: true,
      // roam: true,
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#aaa'
        }
      }
    }],
    tooltip: {
      trigger: 'item',
      formatter: `{b}<br/>{c} ${getUnit(watertype)}`
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {
          show: false,
          readOnly: true
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      },
      top: 'bottom',
      orient: 'vertical'
    },
    visualMap: {
      pieces: mapConfig.piecesObj[themeType][watertype],
      color: ['#d94e5d', '#eac736', '#50a3ba'],
      textStyle: {
        color: '#000'
      }
    },
    series: [{
      type: 'lines',
      coordinateSystem: 'geo',
      polyline: true,
      data: lines,
      silent: true,
      lineStyle: {
        normal: {
          color: '#000',
          width: 1
        }
      },
      zlevel: 1
    }, {
      name: mapConfig.title[themeType][watertype],
      type: 'map',
      // roam: true,
      mapType: mapType, // 自定义扩展图表类型
      data: chartData
    }]
  }
  return opt
}

export {
  getBarChartOpt,
  getLineChartOpt,
  getMapChartOpt,
  getYearRange,
  getLineData,
  getChartTitle,
  getChartLegend,
  getUnit
}
