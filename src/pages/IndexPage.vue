<template lang="pug">
q-page.row.column.q-pa-md
  div.row.justify-between.q-pa-md
    h4.no-margin
      span.text-primary FLEX
      | COIN
    q-icon(name="close" color="grey" size="24px" dense text-color="white" @click="onClose")
  q-form.row.justify-center
    q-input(v-model="userName", outlined, class="full-width", label="First name")
    | InitData:
    | {{initDt}}
    q-btn(@click="sendMessage" label="Send" class="bg-primary q-mt-lg" text-color="white")
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { authRequest } from 'src/common/requests'

const userName = ref('')
const initDt = ref()

const tg = window.Telegram.WebApp

onMounted(() => {
  tg.ready()

  // exchange.getAuth(tg.initData)
  //   .then(r => {
  //     console.log(r.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // userName.value = 'sdf'
})

const onClose = () => {
  tg.close()
}

const sendMessage = () => {
  let data = {
    items: userName.value
  }

  initDt.value = tg.initData

  authRequest({ method: 'get', params: initDt })
    .then((r) => {
      console.log(r.data)
    })
    .catch((err) => {
      console.log(err)
    })

  // exchange
  //   .getAuth(initDt.value)
  //   .then((r) => {
  //     console.log(r.data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })

  // fetch('https://a04a-103-105-213-22.ngrok-free.app/api/v1/bot/available/currencies', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //
  // })
  // tg.sendData(JSON.stringify(json))

  // exchange.sendCurrencies(data)
  //   .then(r => {
  //     console.log(r.data)
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
}
</script>
