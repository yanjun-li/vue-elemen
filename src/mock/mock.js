import Mock from 'mockjs'

let baseURL = process.env.BASE_API

let shLineMock = {
  maxUse(len) {
    return ['-', '-', 860, 789, 1100]
    // return mockDataArr(len, [800, 1100])
  },
  avgSupply(len) {
    return mockDataArr(len, [700, 1000])
  },
  avgUse(len) {
    return mockDataArr(len, [600, 900])
  },
  industryUse(len) {
    return mockDataArr(len, [300, 500])
  },
  cityUse(len) {
    return mockDataArr(len, [400, 600])
  },
  citizenUse(len) {
    return mockDataArr(len, [350, 550])
  }
}

let shBarMock = {
  // industryUse(len) {
  //   return mockDataArr(len, [300, 500])
  // },
  cityUse(len) {
    return mockDataArr(len, [35, 41])
  },
  citizenUse(len) {
    return mockDataArr(len, [20, 30])
  }
}

export default function mockServer(params) {
  Mock.mock(baseURL + '/sh-line', opiton => {
    let result = [shLineMock.maxUse(5), shLineMock.avgSupply(5), shLineMock.avgUse(5), shLineMock.industryUse(5), shLineMock.cityUse(5), shLineMock.citizenUse(5)]
    return result
  })

  Mock.mock(baseURL + '/sh-bar', opiton => {
    let result = {
      cityUse: shBarMock.cityUse(5),
      citizenUse: shBarMock.citizenUse(5)
    }
    console.log(result)
    return result
  })
}
/**
 *
 * @param {string} len
 * @param {*} range
 */
function mockDataArr(len, range) {
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(Mock.mock(`@integer(${range[0]}, ${range[1]})`))
  }
  return arr
}
