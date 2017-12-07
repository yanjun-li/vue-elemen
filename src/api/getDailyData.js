import fetch from '../utils/fetch'

function getDailyWater(areaTypes, areaNames, themeType, start, end) {
  return fetch({
    url: `patrolhandler.do`,
    method: 'post',
    params: {
      provider: 'MMShareBLL.DAL.waterData',
      method: 'getDailyWater'
    },
    data: {
      areaTypesStr: areaTypes,
      areaNamesStr: areaNames,
      themeType,
      startTime: start,
      endTime: end
    }
  })
}

function getJZWater(typeNum) {
  return fetch({
    url: `patrolhandler.do`,
    method: 'post',
    params: {
      provider: 'MMShareBLL.DAL.waterData',
      method: 'getJZWater'
    },
    data: {
      typeNum
    }
  })
}

export {
  getDailyWater,
  getJZWater
}
