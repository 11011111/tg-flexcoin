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
        debounce="200"
        @update:model-value="enterSumFn"
        :select-model="selectedCurrency?.currency"
        @select-model="updCurrency"
      )
      .row.flex.column.full-width
        span.label-text.block.q-py-sm Set the amount
        q-input(
          v-model="amountCryptoCoins"
          placeholder="0 USDT"
          readonly
          :loading="loadingCurrency"
          :suffix="loadingCurrency ? '' : `1 USDT = ${selectedCurrency?.exchange_rate} ${selectedCurrency?.currency}`"
          outlined
        )
  .row.justify-center.full-width.q-px-sm.q-mb-lg.content-end
    q-btn.button-text.btn-style.full-width(
      label="Next"
      color="primary"
      :disable="!amountCryptoCoins"
      :to="{ name: links.PAYMENT_DETAILS.name }"
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

const { getCurrency, getPrice } = settingsState()
const { currencyList, selectedCurrency, loadingCurrency } = storeToRefs(
  settingsState()
)
const amountCurrency = ref<number | null>(null)
const amountCoin = ref<number | null>(null)
const router = useRouter()

onMounted(() => {
  getCurrency()
})

// Изменена валюта
const updCurrency = (currency: string) => {
  getPrice(currency, Number(amountCurrency.value) || 1)
}

// Ввод суммы для обмена
const enterSumFn = (amount: number) => {
  getPrice(selectedCurrency.value?.currency, Number(amount))
}

const amountCryptoCoins = computed(() => {
  if (amountCurrency.value) {
    return selectedCurrency.value?.amount + ' USDT'
  } else {
    return amountCoin.value
  }
})
</script>

<style scoped></style>
