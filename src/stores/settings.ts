import { defineStore } from 'pinia'
import { ref } from 'vue'
import { currenciesRequest, methods, priceRequest } from 'src/common/requests'

export const settingsState = defineStore('settingsState', () => {
  const liveUpdate = ref(false)
  const currencyList = ref<IModelCurrency>() // Список доступных валют
  const selectedCurrency = ref<IModelExchange>() // Курс выбранной валюты

  // Get Currency
  async function getCurrency() {
    await currenciesRequest()
      .then((res) => {
        currencyList.value = res.data.items
        getPrice(res.data.items[0].id, 1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Get currency exchange
  async function getPrice(currency: string, amount: number) {
    await priceRequest({
      method: methods.post,
      params: { currency, amount }
    })
      .then((res) => {
        selectedCurrency.value = res.data
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  return {
    liveUpdate,
    currencyList,
    selectedCurrency,

    getCurrency
  }
})
