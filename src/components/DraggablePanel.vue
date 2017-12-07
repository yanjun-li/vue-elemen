<template>
  <div class="draggabel-panel"
    :style="[pos,zIndexStyle]"
    v-drag="resetPos"
    @click="setZIndex">
    <i class="el-icon-close close-btn"
      @click="closePanel"></i>
    <slot>预置</slot>
  </div>
</template>

<script>

export default {
  directives: {
    drag(el, binding) {
      let startX
      let startY
      let viewWidth = window.innerWidth
      let viewHight = window.innerHeight
      el.onmousedown = event => {
        // 鼠标按下，计算当前元素距离可视区的距离
        startX = event.clientX - el.offsetLeft
        startY = event.clientY - el.offsetTop

        document.onmousemove = event => {
          // 限制移动距离
          let t = event.clientY - startY
          let l = event.clientX - startX
          if (t > 0 && t < viewHight & l > 0 && l < viewWidth) {
            binding.value({ top: t, left: l })
          }
        }
        document.onmouseup = event => {
          document.onmousemove = null
        }
      }
    }
  },
  props: {
    pos: {
      type: Object
    },
    id: {
      type: Number
    },
    maxZIndex: {
      type: Number
    }
  },
  data() {
    return {
      zIndexStyle: {
        zIndex: this.maxZIndex
      }
    }
  },
  computed: {

  },
  methods: {
    // 接受传来的位置数据，并将数据绑定给data下的val
    resetPos(pos) {
      this.pos.top = pos.top + 'px'
      this.pos.left = pos.left + 'px'
    },
    closePanel() {
      this.$emit('closePanel', this.id)
    },
    setZIndex() {
      this.zIndexStyle.zIndex = this.maxZIndex
      this.$emit('maxZIndexIncrease')
    }
  }
}
</script>

<style>
.draggabel-panel {
  width: 600px;
  height: 700px;
  position: absolute;

  border-radius: 4px;
  border: 1px solid #e6ebf5;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  color: #2d2f33;
}
.close-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10;
}
.close-btn:hover {
  color: #409eff;
  cursor: pointer;
}
</style>
