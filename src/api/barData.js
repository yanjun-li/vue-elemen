import fetch from '../utils/fetch'

function getBarData(name) {
  return fetch({
    url: `${name}-bar`,
    method: 'get'
  })
}

export {
  getBarData
}
