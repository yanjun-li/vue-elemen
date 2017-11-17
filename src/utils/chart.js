import * as mapConfig from './map'

function getBarChartOpt(title, range, data) {
  let opt = {
    backgroundColor: '#404a59',
    title: {
      text: title,
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
      data: ['工业', '城镇', '居民'],
      textStyle: {
        color: '#fff'
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
      }
    },
    textStyle: {
      color: '#fff'
    },
    series: [{
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
      data: data.industryUse
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
      data: data.cityUse
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
      data: data.citizenUse
    }]
  }
  return opt
}

function getMapChartOpt(type, mapType, chartData) {
  let opt = {
    backgroundColor: '#404a59',
    title: {
      text: mapConfig.title[type],
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
      pieces: mapConfig.piecesObj[type],
      color: ['#d94e5d', '#eac736', '#50a3ba'],
      textStyle: {
        color: '#fff'
      }
    },
    series: [{
      name: mapConfig.title[type],
      type: 'map',
      roam: true,
      mapType: mapType, // 自定义扩展图表类型
      data: chartData
    }]
  }
  return opt
}
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

function getLineValue(len, range) {

}

export {
  getBarChartOpt,
  getMapChartOpt,
  getYearRange,
  getLineValue
}
