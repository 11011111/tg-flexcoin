import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios'
import { apiLinks } from 'src/common/routerLinks'

export const settingsState = defineStore('settingsState', () => {
  const liveUpdate = ref(false)
  const currencyList = ref(null)

  // Get Currency
  function getCurrency() {
    api
      .get(`${apiLinks.CURRENCIES.list}`)
      .then((res) => {
        currencyList.value = res.data.items
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    currencyList,
    liveUpdate,

    getCurrency
  }
})
