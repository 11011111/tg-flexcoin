import { defineStore } from 'pinia'
import { Ref, ref, watch } from 'vue'
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
    error_title: 'Bad request',
    error_message: 'Sorry, QR code can’t be recognized, please try again',
    media: 'error_badRequest.svg',
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

  watch(errorDialogBottom, (ev) => {
    errorDialogBottom.value.isShow = true
  })

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
