<script setup lang="ts" name="App">
import { usePoint } from '@/hooks/usePoint';
const { msg, point } = usePoint()
const navList = [
  { id: 1,path: '/home', name: '首页' },
  { id: 2,path: '/news', name: '新闻' },
  { id: 3,path: '/about', name: '关于' },
]
</script>

<template>
  <h1>Hello</h1>
  <h2>当前点击时鼠标的坐位为：x {{ point.x || '_' }}，y：{{ point.y || '_' }}。{{ msg }}</h2>
  <div class="navigate">
    <router-link v-for="nav in navList" :to="nav.path" active-class="active" :key="nav.id">{{ nav.name }}</router-link>
  </div>
  <div class="main-content">
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
  .navigate {
    height: 60px;
    display: flex;
    align-items: center;
    background: lightcyan;
    a {
      margin: 0 10px;
    }
  }
  .main-content {
    height: 300px;
    padding: 15px;
    background: pink;
  }
</style>
