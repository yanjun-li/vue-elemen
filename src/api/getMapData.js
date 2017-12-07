import fetch from '../utils/fetch'

function getMapGeojson(params) {
  return fetch({
    // url: `../../static/${name}.json`,
    url: 'http://localhost:8090/static/104_union.json',
    method: 'get'
  })
}

function getMapData(params) {
  return fetch({
    // url: `../../static/${name}.json`,
    url: 'http://localhost:8090/static/newCity_border.json',
    method: 'get'
  })
}

function getJZIndicator(type) {
  return fetch({
    url: `patrolhandler.do`,
    method: 'post',
    params: {
      provider: 'MMShareBLL.DAL.waterData',
      method: 'getJZIndicator'
    },
    data: {
      type
    }
  })
}

function getGYIndicator() {
  return fetch({
    url: `patrolhandler.do`,
    method: 'post',
    params: {
      provider: 'MMShareBLL.DAL.waterData',
      method: 'getGYIndicator'
    },
    data: {}
  })
}

export {
  getMapGeojson,
  getMapData,
  getJZIndicator,
  getGYIndicator
}
