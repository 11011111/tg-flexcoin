import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { currenciesRequest, methods, priceRequest } from 'src/common/requests'

export const settingsState = defineStore('settingsState', () => {
  const liveUpdate = ref(false)
  const currencyList = ref<IModelCurrency>() // Список доступных валют
  const selectedCurrency = ref<IModelExchange>() // Курс выбранной валюты
  const loadingCurrency = ref(true)
  const amountCurrency = ref<number | null>(null)
  const amountCoin = ref<number | null>(null)
  const qrContent = ref('')
  const invoice = ref(null)
  const errorDialogBottom = ref({
    title: 'Bad request',
    desc: 'Sorry, QR code can’t be recognized, please try again',
    img_name: 'error_badRequest.svg',
    isShow: false
  })

  // Get Currency
  async function getCurrency() {
    loadingCurrency.value = true
    await currenciesRequest()
      .then((res) => {
        currencyList.value = res.data.items
        getPrice(res.data.items[0].id, 1)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        loadingCurrency.value = false
      })
  }

  // Get currency exchange
  async function getPrice(currency: string, amount: number) {
    loadingCurrency.value = true
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
      .finally(() => {
        loadingCurrency.value = false
      })
  }

  return {
    liveUpdate,
    currencyList,
    selectedCurrency,
    loadingCurrency,
    amountCurrency,
    amountCoin,
    qrContent,
    invoice,
    errorDialogBottom,

    getCurrency,
    getPrice
  }
})
