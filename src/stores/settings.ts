import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios'
import { apiLinks } from 'src/common/routerLinks'
import { currenciesRequest } from 'src/common/requests'

export const settingsState = defineStore('settingsState', () => {
  const liveUpdate = ref(false)
  const currencyList = ref(null)

  // Get Currency
  async function getCurrency() {
    await currenciesRequest()
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
