<template>
  <div id="app">
    <el-container>
      <el-aside width="300px">
        <sider></sider>
      </el-aside>
      <el-main>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import Sider from './components/Sider'
export default {
  name: 'app',
  components: {
    'sider': Sider
  }
}
</script>

<style>
html{
  font-size:10px;
  width:100%;
  height:100%;
}
body{
  margin:0;
  width:100%;
  height:100%;
}
#app {
  width:100%;
  height:100%;

  font-family: '微软雅黑','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  // padding-left:30rem;
}
.el-container{
  width:100%;
  height:100%;
}
</style>
