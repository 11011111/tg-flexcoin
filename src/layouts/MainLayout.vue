<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { profileState } from 'stores/profile'

const { login, logout } = profileState()
const userName = ref('')
const initDt = ref()

const tg = window.Telegram.WebApp

onMounted(() => {
  tg.ready()

  tg.showAlert(tg.platform)

  // console.log(tg.platform)

  // const accessToken = localStorage.getItem('access')

  // if (accessToken) return

  // login(tg.initData)
})
</script>
