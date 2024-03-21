<template lang="pug">
q-card.q-pa-lg
  .row.justify-center
    img(:src="`${imgPath}bg_exchange.svg`")
  h1.text-center Exchange to USDT

  .row
    UiInput.q-mt-xs.q-mb-md(label="Set the amount" v-model="amountCurrency" :options="currencyList" placeholder="How much" haveAppendSelect )
    UiInput.q-mt-xs.q-mb-md(label="Set the amount" v-model="amountCoin" placeholder="0 USDT" suffix="1 USDT = 35,68 THB" )
</template>

<script setup lang="ts">
import UiInput from 'components/ui/UiInput.vue'
import { onMounted, ref } from 'vue'
import { settingsState } from 'stores/settings'
import { storeToRefs } from 'pinia'

const { getCurrency } = settingsState()
const { currencyList } = storeToRefs(settingsState())
const amountCurrency = ref('')
const amountCoin = ref('')
const imgPath = process.env.DEFAULT_URL_PATH

onMounted(() => {
  getCurrency()
})
</script>

<style scoped></style>
