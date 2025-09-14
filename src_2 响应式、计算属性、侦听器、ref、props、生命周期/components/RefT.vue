<template>
    <div v-if="flag">
        <h1 :ref="(el) => (refAttr[0] = el)">尚硅谷</h1>
        <br />
        <input :ref="(el) => (refAttr[1] = el)" type="text" />
    </div>
    <button @click="showLog">点我打印内容</button>
    <br />
    <button @click="showLog2">销毁元素并打印内容</button>
    <p>
      可以动态获取ref绑定的元素对象
      ref绑定为一个函数，会在每次组件更新时都被调用，函数的第一个参数el为元素引用
      当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数会是 null
    </p>
    <div></div>
</template>

<script lang="ts" setup name="RefT">
import { ref, nextTick } from 'vue'

let flag = ref(true)
let refAttr = ref<any[]>([])

function showLog() {
    // 获取元素的值
    console.log(refAttr.value[0].innerText)
    console.log(refAttr.value[1].value)
}

function showLog2() {
    // 元素销毁时，元素引用会被设置为null
    flag.value = false // 销毁所有元素
    // 等待dom元素更新后执行
    nextTick(() => {
        console.log(refAttr.value[0]) // null
        console.log(refAttr.value[1]) // null
    })
}
</script>