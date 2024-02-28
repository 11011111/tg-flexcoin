<template>
  <q-page class="row column q-pa-md">
    <div class="row justify-between q-pa-md">
      <h4 class="no-margin"><span class="text-primary">FLEX</span>COIN</h4>
      <q-icon name="close" color="grey" size="24px" dense text-color="white" @click="onClose"/>
    </div>
    <q-form class="row justify-center">
      <q-input
        v-model="userName"
        outlined
        class="full-width"
        label="First name"
      />
      <q-btn @click="sendMessage" label="Send" class="bg-primary q-mt-lg" text-color="white"/>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import exchange from 'src/api/exchange'


const userName = ref('')

const tg = window.Telegram.WebApp

onMounted(() => {
  tg.ready()

  userName.value = tg.initDataUnsafe?.user?.username

  exchange.getAuth(tg.initData)
    .then(r => {
      console.log(r.data);
    })
    .catch(err => {
      console.log(err);
    })
  // userName.value = 'sdf'
})

const onClose = () => {
  tg.close()
}



const sendMessage = () => {
  let data = {
    items: userName.value
  }

  console.log(tg.initData);
  exchange.getAuth(tg.initData)
    .then(r => {
      console.log(r.data);
    })
    .catch(err => {
      console.log(err);
    })

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
