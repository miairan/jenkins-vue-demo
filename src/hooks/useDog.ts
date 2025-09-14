import axios from "axios";
import { computed, onMounted, reactive } from "vue";
const DOG_URL = 'https://dog.ceo/api/breed/pembroke/images/random'
export function useDog() {
  // 数据
  const dogList = reactive([])
  // 方法
  const getDog = async () => {
    try {
      const result = await axios.get(DOG_URL)
      dogList.push(result.data.message)
    } catch(error) {
      alert(error)
    }
  }
  // 计算属性
  const dogCount = computed(() => dogList.length)
  // 钩子
  onMounted(() => {
    getDog()
  })
  
  // 向外暴露
  return {
    dogList,
    dogCount,
    getDog
  }
}