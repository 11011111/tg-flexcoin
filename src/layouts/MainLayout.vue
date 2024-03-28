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
import { useRoute, useRouter } from 'vue-router'
import UiErrorBottom from 'components/ui/UiErrorBottom.vue'
import { storeToRefs } from 'pinia'
import { settingsState } from 'stores/settings'

const { openWebApp } = profileState()
const { errorDialogBottom } = storeToRefs(settingsState())
const tg = window.Telegram.WebApp // init TelegramWebApp
const route = useRoute()
const router = useRouter()

if (route.name !== 'scan' || 'onboarding') {
  tg.BackButton.show()
}

tg.BackButton.onClick(() => {
  if (route.name !== 'scan' || 'onboarding') {
    router.back()
  }
})
onBeforeMount(() => {
  openWebApp(tg.initData) // Иначе - проходим авторизацию
})
</script>
