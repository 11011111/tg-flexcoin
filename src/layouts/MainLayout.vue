<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="height: 100vh">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { profileState } from 'stores/profile'
import { useRouter } from 'vue-router'

const { openWebApp } = profileState()
const tg = window.Telegram.WebApp // init TelegramWebApp
const router = useRouter()

onBeforeMount(() => {
  openWebApp(tg.initData) // Иначе - проходим авторизацию
})
</script>
