<template lang="pug">
q-card.q-pa-lg
  .row.justify-center
    img(src="~assets/img/exchange.png" )
  h1.text-center Exchange to USDT

  .row
    UiInput.q-mt-xs.q-mb-md(label="Set the amount" v-model="amountCurrency" placeholder="How much" haveAppendSelect )
    UiInput.q-mt-xs.q-mb-md(label="Set the amount" v-model="amountCoin" placeholder="0 USDT" suffix="1 USDT = 35,68 THB" )

  p.text-black(style="word-wrap: break-word") Мой токен: {{ getToken }}

  q-btn(label="Send" @click="send" )
</template>

<script setup lang="ts">
import UiInput from 'components/ui/UiInput.vue'
import { computed, ref } from 'vue'
import { profileState } from 'stores/profile'

const { getCurrency } = profileState()
const amountCurrency = ref('')
const amountCoin = ref('')

const getToken = computed(() => {
  return localStorage.getItem('access')
})

const send = () => {
  console.log('send')
  getCurrency()
}
</script>

<style scoped></style>
