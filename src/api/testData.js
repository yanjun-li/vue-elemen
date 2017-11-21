import fetch from '../utils/fetch'

function getDailyWater(area, start, end) {
  return fetch({
    url: `patrolhandler.do`,
    method: 'post',
    params: {
      provider: 'MMShareBLL.DAL.waterData',
      method: 'getDailyWater'
    },
    data: {
      areaType: area,
      startTime: start,
      endTime: end
    }
  })
}

export {
  getDailyWater
}
