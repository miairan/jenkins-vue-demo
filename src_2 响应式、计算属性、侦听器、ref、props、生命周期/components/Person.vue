<template>
  <div>我是嚣张的{{ userName }}</div>
  <button @click="showTel">{{tel ? '隐藏' : '查看'}}联系方式</button>
  <div v-if="tel">{{ tel }}</div>

  <hr>
  <input type="text" v-model="firstName"> <br>
  <input type="text" v-model="lastName">
  <h2>全名：{{ fullName }}</h2>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, toRef, computed, watch, getCurrentInstance, shallowRef } from 'vue'
const userName = ref('小张')
const tel = ref('')
const obj = { name: '小张', age: 18, gender: '男'}
const obj1 = reactive(obj)
let {name, age } = toRefs(obj1)
let gender = toRef(obj1, 'gender')
obj1.name = '嚣张的小张'
age.value = 40
gender.value = '女'
const info = computed(() => {
  return {
    name: name.value,
    age: age.value
  }
}) 

const showTel = () => {
  if (tel.value) {
    tel.value = ''
    return
  }
  tel.value = '15828223821'
  tel.value = '1213'

}

let firstName = ref('zhang'), lastName = ref('san')
// let fullName = computed(()=>firstName.value + '-' + lastName.value) // 只读不修改
let fullName = computed({ // 既读又修改
    get: ()=> firstName.value + '-' + lastName.value,
    set: (val) => {
        const [first, last] = val.split('-')
        firstName.value = first, lastName.value = last
    } 
})
const vm = getCurrentInstance()
let unwatch = watch(firstName, (val) => {
  console.log('firstName改变了', firstName)
  console.dir(vm.proxy.$watch)
  if (val.includes('aa')) unwatch()
})


const t = shallowRef({ name: '小张', age: 18 })

watch(() => t, (n, o) => {
  console.log('仅当 t 被整体替换时触发')
})
t.value.name = '小汪'      // 不触发
</script>

<style scoped>

</style>
