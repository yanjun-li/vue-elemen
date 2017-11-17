import fetch from '../utils/fetch'

function getLineData(name) {
  return fetch({
    url: `${name}-line`,
    method: 'get'
  })
}

export {
  getLineData
}
