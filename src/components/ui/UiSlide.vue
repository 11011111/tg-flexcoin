<script setup lang="ts">
defineProps({
  urlPath: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  prevText: {
    type: String,
    default: ''
  }
})
</script>

<template lang="pug">
.row.wrap.justify-between
  .row.full-width.justify-center(v-if="urlPath")
    q-img.img-block-style(:src="urlPath" loading="lazy" img-class="qwe" )
  .row.full-width
    .row.full-width.justify-center.content-start.text-block-style(v-if="title")
      h1.text-center.margin-top-h1.q-px-lg {{ title }}
      p(v-html="prevText").text-center.full-width.q-px-lg
</template>

<style lang="sass">
.qwe
  width: auto
</style>
<style scoped lang="sass">

.text-block-style
  margin: 0
  min-height: 128px

  h1
    margin-top: 0
    margin-bottom: 10px


@media (max-width: $sm-breakpoint)
  .img-block-style
    text-align: center
    height: 650px
    margin: 5% 0

@media (max-width: $xs-breakpoint)
  .img-block-style
    text-align: center
    height: 350px
    margin: 5% 0
</style>
