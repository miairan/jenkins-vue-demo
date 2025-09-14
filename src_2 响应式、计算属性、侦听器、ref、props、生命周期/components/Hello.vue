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
  import { ref, onMounted } from 'vue'
  const sayHi = ref('你好')
  onMounted(() => {
    console.log('组件挂载了的回调1');
    
  })
  onMounted(() => {
    setTimeout(()=> {
      console.log('组件挂载了的回调2');
    })
    
  })
  onMounted(() => {
    console.log('组件挂载了的回调3');
    
  })
</script>

<style scoped>

</style>
