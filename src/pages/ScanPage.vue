<script setup lang="ts">
import UiUploaderBtn from 'components/ui/UiUploaderBtn.vue'
import { apiLinks } from 'src/common/routerLinks'
const imgPath = process.env.DEFAULT_URL_PATH
</script>

<template lang="pug">
q-card.row.text-center.justify-center.q-pa-lg.content-between(style="height:100vh")
  .row.full-width
    .row.full-width.justify-center.content-start.q-mt-lg
      img(:src="`${imgPath}qr.svg`")
    .row.text-center.justify-center.q-mt-lg
      h1.full-width.q-px-lg Welcome to Flexcoin!
      p.q-px-lg The easiest way to pay by QR codes in cafes, restaurants or any service

  .row.full-width
    .row.full-width.q-pb-lg
      .col-2.q-px-xs
        q-btn.full-width.btn-style.history(
          :icon="`img:${imgPath}run_time.svg`"
          color="bg"
          size="12px"
          unelevated
          no-caps
        )
      .col-10.q-px-xs
        UiUploaderBtn(:requestURL="apiLinks.QR.list")
</template>

<style scoped lang="sass"></style>
