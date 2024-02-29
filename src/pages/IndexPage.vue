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
import { profileState } from 'stores/profile'

const { login, logout } = profileState()
const userName = ref('')
const initDt = ref()

const tg = window.Telegram.WebApp

const onClose = () => {
  logout()
  tg.close()
}

const sendMessage = () => {
  // initDt.value = tg.initData
  // 'query_id=AAHfvhIKAAAAAN--EgqlonTI&user=%7B%22id%22%3A169000671%2C%22first_name%22%3A%22%D0%9C%D0%B0%D0%BA%D1%81%D0%B8%D0%BC%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22m11011111%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1709127503&hash=a0379d456320ddfe387507342c4aec3f7d25761904abd2d14cece35ffe6c3e74'
}
</script>
