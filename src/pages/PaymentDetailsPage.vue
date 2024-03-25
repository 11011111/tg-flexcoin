<script setup lang="ts">
const imgPath = process.env.DEFAULT_URL_PATH
</script>

<template lang="pug">
q-card.q-pa-lg.flex(style="min-height: 100%")
  .row.justify-center.q-px-sm.q-mb-lg
    .row.justify-center
      img(src="~assets/img/bg_payment_details.svg")
    h1.text-center Payment details

  .row.justify-center.full-width.q-px-sm.q-mb-lg.content-end
    .col-2.q-px-xs
      q-btn.full-width.btn-style.history(
        :icon="`img:${imgPath}run_time.svg`"
        color="bg"
        size="12px"
        unelevated
        no-caps
      )
    .col-10.q-px-xs
      q-btn.button-text.btn-style.full-width(
        label="Submit"
        color="primary"
        unelevated
        no-caps
      )
</template>

<style scoped lang="sass"></style>
