<template>
  <div>我是嚣张的{{ userName }}</div>
  <button @click="showTel">{{tel ? '隐藏' : '查看'}}联系方式</button>
  <div v-if="tel">{{ tel }}</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const userName = ref('小张')
const tel = ref('')

const showTel = () => {
  if (tel.value) {
    tel.value = ''
    return
  }
  tel.value = '15828223821'
}
</script>

<style scoped>

</style>
