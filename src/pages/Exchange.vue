<template lang="pug">
q-card.q-pa-lg
  .row.justify-center
    img(src="~assets/img/bg_exchange.svg")
  h1.text-center Exchange to USDT

  .row
    UiInput.q-mt-xs.q-mb-md(label="Set the amount" v-model="amountCurrency" :options="currencyList" placeholder="How much" haveAppendSelect )
    .row.flex.column.full-width
      span.label-text.block.q-py-sm Set the amount
      q-input(
        v-model="amountCoin"
        placeholder="0 USDT"
        :suffix="`1 USDT = ${exchangeRate?.exchange_rate} ${exchangeRate?.currency}`"
        outlined
      )
</template>

<script setup lang="ts">
import UiInput from 'components/ui/UiInput.vue'
import { computed, onMounted, ref } from 'vue'
import { settingsState } from 'stores/settings'
import { storeToRefs } from 'pinia'

const { getCurrency } = settingsState()
const { currencyList, selectedCurrency } = storeToRefs(settingsState())
const amountCurrency = ref('')
const amountCoin = ref('')
const imgPath = process.env.DEFAULT_URL_PATH

onMounted(() => {
  getCurrency()
})

const exchangeRate = computed(() => {
  return selectedCurrency.value
})
</script>

<style scoped></style>
