<template>
  <div class="selector-panel">
    <ol>
      <li class="selector-item"
        :class="{selected:index===selectedIndex}"
        v-for="(item,index) in option"
        :key="item.label"
        @click="setSelect(index,item.value)">{{item.label}}</li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: -1
    }
  },
  props: ['option'],
  methods: {
    setSelect(index, value) {
      this.selectedIndex = this.selectedIndex === index ? -1 : index
      this.$emit('selectChange', value, index)
    }
  }
}
</script>

<style>
.selector-panel {
  display: inline-block;
  height: 40vh;
  width: 10vw;
  margin: 0 5px;
  border: 1px solid #e6ebf5;
  border-radius: 5px;
  box-sizing: border-box;
  /* box-shadow: inset 1px 1px 2px #000, inset -1px -1px 2px #000; */
}
.selector-panel ol {
  list-style: none;
  padding-left: 0;
}
.selector-item:hover {
  cursor: pointer;
  background-color: #f5f7fa;
}
.selector-item.selected {
  color: #409eff;
}
</style>
