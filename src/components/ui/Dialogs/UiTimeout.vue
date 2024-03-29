<script setup lang="ts">
import { links } from 'src/common/routerLinks'
const imgPath = process.env.DEFAULT_URL_PATH
defineProps({
  title: String,
  desc: String,
  media: String,
  modelValue: Boolean
})
defineEmits(['update:modelValue'])
</script>

<template lang="pug">
q-dialog(
  :model-value="modelValue"
  position="bottom"
  persistent
)
  q-card.full-width.modern-dialog.q-py-sm.q-px-md
    q-card-section.no-padding
      .row.items-center.no-wrap
        h2.text-center.q-px-lg.q-pt-md(v-if="title") {{ title }}
    q-card-section.q-pb-lg
      .row.justify-center
        p.text-center.q-px-sm.full-width(v-if="desc") {{ desc }}
        img.text-center.q-px-lg.q-mt-md.flex(v-if="media" :src="`${imgPath}${media}`")
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
        q-btn.button-text.btn-style.q-ml-sm.full-width(
          label="Main page"
          color="primary"
          :to="{name: links.SCAN.name}"
          unelevated
          no-caps
        )
</template>

<style scoped lang="sass"></style>
