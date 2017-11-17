import fetch from '../utils/fetch'

function getCrosData() {
  return fetch({
    url: `patrolhandler.do`,
    method: 'post',
    params: {
      provider: 'MMShareBLL.DAL.login',
      method: 'getWater'
    }
  })
}

export {
  getCrosData
}
