<template>
  <div id="app">
    <aside class="sider">
      <sider></sider>
    </aside>
    <main></main>
    <router-view/>
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
#app {
  font-family: '微软雅黑','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
