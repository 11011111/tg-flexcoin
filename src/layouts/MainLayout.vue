<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="height: 100vh">
      <router-view />
    </q-page-container>
    <UiErrorBottom
      :title="errorDialogBottom.title"
      :desc="errorDialogBottom.desc"
      :name-img="errorDialogBottom.img_name"
      v-model="errorDialogBottom.isShow"
    />
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { profileState } from 'stores/profile'
import { useRouter } from 'vue-router'
import UiErrorBottom from 'components/ui/UiErrorBottom.vue'
import { storeToRefs } from 'pinia'
import { settingsState } from 'stores/settings'

const { openWebApp } = profileState()
const { errorDialogBottom } = storeToRefs(settingsState())
const tg = window.Telegram.WebApp // init TelegramWebApp
const router = useRouter()

tg.BackButton.show()

onBeforeMount(() => {
  openWebApp(tg.initData) // Иначе - проходим авторизацию
})
</script>
