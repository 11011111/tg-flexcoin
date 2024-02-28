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
import { api } from 'boot/axios'
import { apiLinks } from 'src/common/routerLinks'

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
  // 'query_id=AAHfvhIKAAAAAN--EgqlonTI&user=%7B%22id%22%3A169000671%2C%22first_name%22%3A%22%D0%9C%D0%B0%D0%BA%D1%81%D0%B8%D0%BC%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22m11011111%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1709127503&hash=a0379d456320ddfe387507342c4aec3f7d25761904abd2d14cece35ffe6c3e74'

  api
    .get(`${apiLinks.AUTH.list}?${initDt.value}`)
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
