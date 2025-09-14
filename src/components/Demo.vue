<template>
  <div>
    <h2>当前点击时鼠标的坐位为：x {{ point.x }}，y：{{ point.y }}</h2>
  </div>
</template>

<script setup lang='ts'>
import { useDemo } from '@/hooks/usePoint';
const { point } = useDemo()
</script>

<style scoped>

</style>
