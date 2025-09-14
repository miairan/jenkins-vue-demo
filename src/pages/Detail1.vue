<template>
  <h2>新闻详情1，需params传id匹配</h2>
  <div>标题：{{ news.title }}</div>
  <div>内容：{{ news.content }}</div>
</template>

<script setup lang='ts' name="Detail1">
import { computed } from 'vue'
import { useNewsStore } from '@/store/news'
const props = defineProps(['id'])
const { newsList } = useNewsStore()
const news = computed(() => {
  return newsList.filter(item => item.id === props.id)[0]
})
</script>

<style scoped>

</style>
