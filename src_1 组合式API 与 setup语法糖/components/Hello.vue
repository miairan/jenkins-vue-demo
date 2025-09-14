<template>
  <div>{{ sayHi }}</div>
</template>

<!-- <script lang='ts'>
export default {
  name: 'Hello',
  setup() {
    return () => '<h1>你好不好啊</h1>'
  }
}
</script> -->
<script setup lang="ts" name="Hello123">
  import { ref } from 'vue'
  const sayHi = ref('你好')
</script>

<style scoped>

</style>
