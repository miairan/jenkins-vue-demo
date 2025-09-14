import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'

export const useNewsStore = defineStore('news', {
  // 真正存储数据的地方
  state: () => {
    return {
      newsList: [
        { id: 1, title: '震惊', content: '明天是周二' },
        { id: 2, title: '好消息', content: '你要上班了' },
        { id: 3, title: '好消息2', content: '你要上班了2' },
        { id: 4, title: '好消息3', content: '你要上班了3' },
      ]
    }
  }
})