<template>
  <div>我是嚣张的{{ userName }}，有空找我啊</div>
  <button @click="showTel">{{tel ? '隐藏' : '查看'}}联系方式</button>
  <div v-show="tel"> {{ tel }} </div>
</template>

<script lang='ts'>
export default {
  name: 'Person',
  setup() {
    let userName = '小张'
    let tel = ''

    const showTel = () => {
      if (tel) {
        tel = ''
        return
      }
      tel = '15828223821'
    }
    return { userName, tel, showTel}
  }
}


</script>

<style scoped>

</style>
