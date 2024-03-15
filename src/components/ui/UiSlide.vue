<script setup lang="ts">
defineProps({
  urlPath: String,
  title: String,
  prevText: String
})
</script>

<template lang="pug">
.row.column.wrap
  .img-block-style
    q-img.full-width(:src="urlPath"  )
  .text-block-style
    h1.text-center.margin-top-h1.q-px-lg {{ title }}
    p(v-html="prevText").text-center.full-width.q-px-lg
</template>

<style scoped lang="sass">
.img-block-style
  min-height: 358px
  height: 358px
  img
    height: 100%

.text-block-style
  min-height: 185px


.margin-top-h1
  margin-top: 55px
</style>
