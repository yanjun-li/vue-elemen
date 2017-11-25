<template>
  <div class="draggabel-panel"
    :style="style"
    v-drag="greet">

  </div>
</template>

<script>
export default {
  directives: {
    drag: {
      bind(el, binding) {
        el.onmousedown = event => {
          // 鼠标按下，计算当前元素距离可视区的距离
          let disX = event.clientX - el.offsetLeft
          let disY = event.clientY - el.offsetTop
          document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离
            let l = e.clientX - disX
            let t = e.clientY - disY
            // 移动当前元素
            el.style.left = l + 'px'
            el.style.top = t + 'px'
            // 将此时的位置传出去
            binding.value({ x: e.pageX, y: e.pageY })
          }
          document.onmouseup = function (e) {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  },
  data() {
    return {
      val: '123',
      style: {
        width: '100px',
        height: '100px',
        background: 'aqua',
        position: 'absolute',
        right: '30px',
        top: 0
      }
    }
  },
  methods: {
    // 接受传来的位置数据，并将数据绑定给data下的val
    greet(val) {
      this.val = val
      console.log(val)
    }
  }
}
</script>

<style>
.draggabel-panel {
  /* background: #000 */
}
</style>
