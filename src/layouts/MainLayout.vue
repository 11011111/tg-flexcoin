<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="height: 100vh">
      <router-view />
    </q-page-container>
    <UiErrorBottom
      :error_title="errorDialogBottom.error_title"
      :error_message="errorDialogBottom.error_message"
      :media="errorDialogBottom.media"
      v-model="errorDialogBottom.isShow"
    />
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from 'vue'
import { profileState } from 'stores/profile'
import { useRoute, useRouter } from 'vue-router'
import UiErrorBottom from 'components/ui/Dialogs/UiErrorBottom.vue'
import { storeToRefs } from 'pinia'
import { settingsState } from 'stores/settings'

const { openWebApp } = profileState()
const { errorDialogBottom } = storeToRefs(settingsState())
const tg = window.Telegram.WebApp // init TelegramWebApp
const route = useRoute()
const router = useRouter()

const backBtnRouteNameList = ['scan', 'onboarding']

tg.BackButton.onClick(() => {
  router.back()
})
onBeforeMount(() => {
  openWebApp(tg.initData) // Иначе - проходим авторизацию
})

watch(
  () => route.name,
  async () => {
    if (backBtnRouteNameList.includes(route.name)) {
      tg.BackButton.hide()
    } else {
      tg.BackButton.show()
    }
  }
)
</script>
