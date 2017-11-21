<template>
  <div class="muti-select-tab">
    <div v-for="tab in selectTabs" :key="tab.label" class="selector-panel">
      <ol>
        <li class="selector-item" :class="{selected:isSelected}" v-for="option in tab.option" :key="option.label" @click="setSelect($event)">{{option.label}}</li>
      </ol>
    </div>
    <i class="el-icon-arrow-right to-result"></i>
    <div class="selector-panel selector-result">
      <ol>
        <li v-for="option in result" :key="option.label" class="selector-item">{{option.label}}</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelected: false,
      selectTabs: [
        {
          label: '全市',
          option: [
            {
              label: '全市',
              value: 'sh'
            }, {
              label: '供水分区',
              value: 'gsfq'
            }, {
              label: '行政区',
              value: 'xzq'
            }
          ]
        }, {
          label: '供水分区',
          option: [
            {
              label: '全市',
              value: 'sh'
            }, {
              label: '供水分区',
              value: 'gsfq'
            }, {
              label: '行政区',
              value: 'xzq'
            }
          ]
        }, {
          label: '行政区',
          option: [
            {
              label: '全市',
              value: 'sh'
            }, {
              label: '供水分区',
              value: 'gsfq'
            }, {
              label: '行政区',
              value: 'xzq'
            }
          ]
        }
      ],
      result: [
        {
          label: '全市',
          value: 'sh'
        }, {
          label: '供水分区',
          value: 'gsfq'
        }, {
          label: '行政区',
          value: 'xzq'
        }
      ]
    }
  },
  methods: {
    setSelect(event) {
      let element = event.target

      element.classList.toggle('selected')
    }
  }
}
</script>

<style>
.muti-select-tab {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
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
