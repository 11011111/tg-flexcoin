import { defineStore } from 'pinia'
import { ref } from 'vue'

export const settingsState = defineStore('settingsState', () => {
  const liveUpdate = ref(false)

  return {
    liveUpdate
  }
})
