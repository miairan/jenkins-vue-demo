import { reactive, computed, onMounted, onBeforeUnmount, watch, watchEffect } from "vue";

export function usePoint() {
  // 数据
  const point = reactive({x: null, y: null})
  const msg = computed(() => {
    if (point.x === null && point.y === null) return ''
    if (point.x >= 600 || point.y >= 600) {
      return '点击点在(600, 600)之外'
    }
    return '点击点在(600, 600)以内'
  })
  // 方法
  function changePoint(event) {
    point.x = event.pageX
    point.y = event.pageY
  }
  // 生命周期钩子
  onMounted(() => {
    window.addEventListener('click', changePoint)
  })
  onBeforeUnmount(()=> {
    window.removeEventListener('click', changePoint)
  })
  // watch
  watch(point, (val) => {
    if (val.x > 600 || val.y > 600) {
      console.log('watchE point.x大于600 或 point.y 大于 600', point.x, point.y)
    }
  })
  watchEffect(() => {
    if (point.x > 400) {
      console.log('watchEffect point.x大于400', point.x)
    }
  })

  // 向外暴露 属性 和 方法
  return {
    msg,
    point
  }
}