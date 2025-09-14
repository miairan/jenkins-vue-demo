<template>
  <div>
    <ul>
      <li v-for="(dog, index) in dogList" :key="index">
        <img :src="dog" alt="">
      </li>
    </ul>
    <button @click="getDog">新增狗狗</button>
    <h3>共有 <span>{{ dogCount }}</span> 只狗狗</h3>
  </div>
</template>

<script setup lang='ts'>
import { useDog } from '@/hooks/useDog';
const {dogList, dogCount, getDog} = useDog()
</script>

<style lang="less" scoped>
  ul {
    margin: 20px;
    padding: 10px;
    list-style: none;
    li {
      height: 200px;
      display: inline-block;
      margin-right: 10px;
      img {
        height: 100%;
      }
    }
  }
  h3 {
    span {
      color: deepskyblue;
    }
  }
</style>
