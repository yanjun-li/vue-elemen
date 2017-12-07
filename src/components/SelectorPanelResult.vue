<template>
  <div class="selector-panel selector-result">
    <ol>
      <li class="selector-item"
        :class="{selected:index===selectedIndex}"
        v-for="(item,index) in option"
        :key="item.label"
        @click="setSelect(index,waterTypes[item.waterType])">{{item.areaName+'-'+ waterTypes[item.waterType]}}
        <i class="el-icon-circle-close"
          @click.stop="removeItem(index)"></i>
      </li>
    </ol>
  </div>
</template>

<script>
import { waterTypes } from '../utils/config'
export default {
  data() {
    return {
      selectedIndex: -1,
      waterTypes
    }
  },
  props: ['option'],
  methods: {
    setSelect(index, value) {
      this.selectedIndex = this.selectedIndex === index ? -1 : index
      this.$emit('selectChange', value, index)
    },
    removeItem(index) {
      this.option.splice(index, 1)
      this.selectedIndex = -1
    }
  }
}
</script>

<style scoped>
.selector-panel {
  display: inline-block;
  height: 40vh;
  width: 18vw;
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
.selector-item {
  position: relative;
}
.selector-item:hover {
  cursor: pointer;
  background-color: #f5f7fa;
}
.selector-item.selected {
  color: #409eff;
}
.selector-item i {
  position: absolute;
  right: 10px;
  top: 6px;
}
.selector-item i:hover {
  color: #409eff;
}
</style>
