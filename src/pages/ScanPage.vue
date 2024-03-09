<script setup lang="ts">
const imgPath = process.env.DEFAULT_URL_PATH
</script>

<template lang="pug">
q-card.q-pa-lg.text-center.row.justify-center.items-end(style="height:100vh")
  .row
    img(:src="`${imgPath}qr.svg`")
  .row.text-center
    h1.full-width Welcome to Flexcoin!
    p The easiest way to pay by QR codes in cafes, restaurants or any service

  q-btn.full-width.button-text.btn-style(
    label="Start scanning"
    color="primary"
    no-caps
  )

</template>

<style scoped lang="sass"></style>
