<template>
  <router-view />
</template>

<script setup lang="ts">
const tg = window.Telegram.WebApp // init TelegramWebApp
tg.expand() //full screen
</script>
