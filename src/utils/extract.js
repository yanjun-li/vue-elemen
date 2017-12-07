import Mock from 'mockjs'
// let itemStyle={
//   normal:{
//     borderWidth :0
//   }
// }
export function extract(geojson, range) {
  let features = geojson.features
  let data = []
  features.forEach(element => {
    let properties = element.properties
    let num = Object.keys(properties).length
    if (num === 1) {
      data.push({
        name: properties.name,
        value: Mock.mock(`@float(${range[0]}, ${range[1]})`),
        itemStyle: {
          normal: {
            borderWidth: 0
          }
        }
      })
    } else {
      data.push({
        name: properties.name,
        value: '-',
        itemStyle: {
          normal: {
            borderWidth: 0
          }
        }
      })
    }
  })
  return data
}
