import Mock from 'mockjs'
export function extract(geojson, range) {
  let features = geojson.features
  let data = []
  features.forEach(element => {
    let properties = element.properties
    data.push({
      name: properties.name,
      value: Mock.mock(`@float(${range[0]}, ${range[1]})`)
    })
  })
  return data
}
