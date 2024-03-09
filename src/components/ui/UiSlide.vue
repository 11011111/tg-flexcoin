<script setup lang="ts">
defineProps({
  urlPath: String,
  title: String,
  prevText: String
})
</script>

<template lang="pug">
.row.column.wrap
  img.full-width(:src="urlPath" width="100%")
  h1.text-center.margin-top-h1 {{ title }}
  p(v-html="prevText").text-center.full-width
</template>

<style scoped lang="sass">
.margin-top-h1
  margin-top: 75px
</style>
