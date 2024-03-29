<script setup lang="ts">
import UiUploaderBtn from 'components/ui/UiUploaderBtn.vue'
import { apiLinks, links } from 'src/common/routerLinks'

const imgPath = process.env.DEFAULT_URL_PATH
</script>

<template lang="pug">
q-card.row.text-center.justify-center.q-pa-lg.content-between(style="height:100vh")
  .flex.column.justify-center.content-center
    .flex.column.justify-center.content-center.q-mt-lg.mt-bg
      img(:src="`${imgPath}qr.svg`")
    .flex.column.justify-center.content-center.q-mt-lg
      h1.text-center.q-px-lg Welcome to Flexcoin!
      p.text-center.q-px-lg The easiest way to pay by QR codes in cafes, restaurants or any service

  .row.full-width
    .row.full-width.q-pb-lg
      .col-2.q-px-xs
        q-btn.full-width.btn-style.history(
          :icon="`img:${imgPath}run_time.svg`"
          color="bg"
          size="12px"
          :to="{name: links.PAYMENT_DETAILS.name}"
          unelevated
          no-caps
        )
      .col-10.q-px-xs
        UiUploaderBtn(:requestURL="apiLinks.QR.list" )
</template>

<style scoped lang="sass">
.mt-bg
  margin-top: 25%
</style>
