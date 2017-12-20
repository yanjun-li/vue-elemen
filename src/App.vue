<template>
  <div id="app">
    <el-container>
      <el-aside width="300px">
        <Sider @createChart="addChart" />
      </el-aside>
      <el-main>
        <DraggablePanel v-for="chart in chartList"
          :key="chart.id"
          :pos="chart.pos"
          :id="chart.id"
          :maxZIndex="maxZIndex"
          @closePanel="removeChart"
          @maxZIndexIncrease="maxZIndexIncrease">
          <Graph :chartParams="chart.chartParams"
            :id="chart.id" />
        </DraggablePanel>
        <MapChart/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Sider from './components/Sider'
import MapChart from './components/MapChart'
import Graph from './components/Graph'
import DraggablePanel from './components/DraggablePanel'

let getRandom = (a, b) => {
  return Math.random() * (b - a) + a
}
let getRandomPos = () => {
  let top = Math.round(Math.random() * 45) + 'px'
  let left = Math.round(getRandom(0, window.innerWidth - 300 - 610)) + 'px'
  return {
    top,
    left
  }
}
export default {
  name: 'app',
  components: {
    Sider,
    MapChart,
    Graph,
    DraggablePanel
  },
  data() {
    return {
      chartList: [
      ],
      maxZIndex: 1,
      borderType: 'sh'
    }
  },
  computed: {

  },
  methods: {
    addChart(chartObj) {
      console.log(chartObj)
      this.chartList.push({
        id: this.chartList.length,
        pos: getRandomPos(),
        chartParams: chartObj
      })
    },
    removeChart(id) {
      let removeIndex = this.chartList.findIndex(chart => {
        return chart.id === id
      })
      this.chartList.splice(removeIndex, 1)
    },
    maxZIndexIncrease() {
      this.maxZIndex++
    }
  }
}
</script>

<style>
html {
  font-size: 10px;
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;

  font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  // padding-left:30rem;
}
.el-container {
  width: 100%;
  height: 100%;
}

.el-main {
  background-color: rgb(243, 243, 243);
  position: relative;
}
#map-chart {
  /* float: right; */
}
</style>
