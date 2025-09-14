<template>
  <div>News</div>
  <ul>
    <li v-for="(news, index) in newsList" :key="news.id" @click="toDetail((index % 2) ? news.id : news.title)">{{ news.title }}</li>
  </ul>
  <router-view></router-view>
</template>

<script setup lang='ts' name="News">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNewsStore } from '@/store/news'
const { newsList } = useNewsStore()
const router = useRouter()
const toDetail = (val: string | number) => {
  let route = null
  if(typeof val === 'number') {
    route = { name: 'detail', params: { id: val }}
  } else {
    route = { name: 'detailByTitle', params: { title: val }}
  }

  router.push(route)
}
</script>

<style scoped>
 
</style>
