<template lang="pug">
q-card.q-pa-lg.flex(style="min-height: 100%")
  .row.justify-center.q-px-sm.q-mb-lg
    .row.justify-center
      img(src="~assets/img/bg_exchange.svg")
    h1.text-center Exchange to USDT

    .row
      UiInput.q-mt-xs.q-mb-md(
        label="Set the amount"
        v-model="amountCurrency"
        :options="currencyList"
        placeholder="How much"
        @update:model-value="enterSumFn"
        :select-model="selectedCurrency?.currency"
        @select-model="updCurrency"
      )
      .row.flex.column.full-width
        span.label-text.block Set the amount
        q-input(
          v-model="amountCryptoCoins"
          placeholder="0 USDT"
          :loading="loadingCurrency"
          :suffix="suffixAmountCryptoCoins"
          outlined
          readonly
        )
  .row.justify-center.full-width.q-px-sm.q-mb-lg.content-end
    q-btn.button-text.btn-style.full-width(
      label="Next"
      color="primary"
      :disable="!amountCryptoCoins"
      @click="nextToPaymentDetails"
      :loading="loaderNextBtn"
      unelevated
      no-caps
    )
</template>

<script setup lang="ts">
import UiInput from 'components/ui/UiInput.vue'
import { computed, onMounted, ref } from 'vue'
import { settingsState } from 'stores/settings'
import { storeToRefs } from 'pinia'
import { links } from 'src/common/routerLinks'
import { useRouter } from 'vue-router'
import { invoiceRequest, methods } from 'src/common/requests'

const { getCurrency, getPrice } = settingsState()
const {
  currencyList,
  selectedCurrency,
  loadingCurrency,
  amountCurrency,
  amountCoin,
  qrContent,
  invoice
} = storeToRefs(settingsState())

const router = useRouter()
const loaderNextBtn = ref(false)

onMounted(() => {
  getCurrency()
})

// Изменена валюта
const updCurrency = (currency: string) => {
  getPrice(currency, Number(amountCurrency.value) || 1)
}

// Ввод суммы для обмена
const enterSumFn = (amount: number) => {
  getPrice(selectedCurrency.value?.currency, Number(amount) || 1)
}

const amountCryptoCoins = computed(() => {
  if (amountCurrency.value) {
    return selectedCurrency.value?.amount + ' USDT'
  } else {
    return amountCoin.value
  }
})

const suffixAmountCryptoCoins = computed(() => {
  if (selectedCurrency.value) {
    if (loadingCurrency.value) {
      return ''
    } else {
      return `1 USDT = ${selectedCurrency.value?.exchange_rate} ${selectedCurrency.value?.currency}`
    }
  } else {
    return ''
  }
})

const nextToPaymentDetails = () => {
  loaderNextBtn.value = true
  invoiceRequest({
    method: methods.post,
    params: {
      qr_content: qrContent.value,
      currency: selectedCurrency.value?.currency,
      amount: Number(amountCurrency.value)
    }
  })
    .then((res) => {
      invoice.value = res.data.invoice
      router.push({ name: links.PAYMENT_DETAILS.name })
    })
    .catch((e) => {
      console.log(e.response)
    })
    .finally(() => {
      loaderNextBtn.value = false
    })

  // router.push({ name: links.PAYMENT_DETAILS.name })
}
</script>

<style scoped></style>
