<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { profileState } from 'stores/profile'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const { openWebApp, getMe } = profileState()
const tg = window.Telegram.WebApp // init TelegramWebApp
const router = useRouter()

onBeforeMount(() => {
  tg.ready() // Start tgWebApp
  tg.expand() //full screen
  const accessToken = localStorage.getItem('access') // Проверка записи токена в LS

  // Проверка токена
  if (accessToken) {
    getMe() // Если ок - получаем данные пользователя
  } else {
    openWebApp(tg.initData) // Иначе - проходим авторизацию
  }
})
</script>
