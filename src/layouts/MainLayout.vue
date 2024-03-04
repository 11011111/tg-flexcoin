<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { profileState } from 'stores/profile'

const { openWebApp } = profileState()
const tg = window.Telegram.WebApp // init TelegramWebApp

onMounted(() => {
  tg.ready() // Start tgWebApp
  const accessToken = localStorage.getItem('access') // check have token

  if (accessToken) return // have token - do nothing now
  openWebApp(tg.initData) // else - get initData for auth
})
</script>
