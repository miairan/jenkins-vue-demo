<template>
  <h2>新闻详情</h2>
  <div>标题：{{ news.title }}</div>
  <div>内容：{{ news.content }}</div>
</template>

<script setup lang='ts' name="Detail">
import { computed } from 'vue'
import { useNewsStore } from '@/store/news'
const props = defineProps<{id?: string, title?: string}>()
console.log(props)
const { newsList } = useNewsStore()
const news = computed(() => {
  if (props.title) {
    return newsList.filter(item => item.title === props.title)[0]
  }
  return newsList.filter(item => item.id === Number(props.id))[0]
})
</script>

<style scoped>

</style>
