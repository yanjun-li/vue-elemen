import fetch from '../utils/fetch'

export function getMapData(name) {
  return fetch({
    url: `../../static/${name}.json`,
    method: 'get'
  })
}
