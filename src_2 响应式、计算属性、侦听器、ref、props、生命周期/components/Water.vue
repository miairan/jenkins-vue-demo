<template>
  <div class="person">
    <h2 id="demo">水温：{{ temp }}</h2>
    <h2>水位：{{ height }}</h2>
    <button @click="changeTemp">水温+10</button>
    <button @click="changeHeight">水位+10</button>
<br>
    <input type="text" v-model="t.name">
    <input type="number" v-model.number="t.age">
    {{t.car.brand}}
    <h2>{{p}}</h2>
  </div>
</template>

<script setup lang='ts' name="Water">
import {ref, watchEffect, reactive, watch} from 'vue'
  // 数据
  let temp = ref(0)
  let height = ref(0)
  // 方法
  function changeTemp(){
    temp.value += 10
  }
  function changeHeight(){
    height.value += 10
  }
  watchEffect(() => {
    // const t = temp.value
    // const h = height.value
    const condition = temp.value >= 40 || height.value >=30
    // const condition2 = h >= 40 || h >= 30
    if (condition) {
      console.log('向服务器发送消息')
    }
  })

  const p = ref('a')
  const t = reactive({name: '小张', age: 18,car: {brand: '宝马'}})
  watch(() => t, (newVal, oldVal) => {
    console.log(newVal, oldVal, newVal.car.brand)
    p.value = newVal.car.brand
  })


</script>

<style scoped>

</style>
