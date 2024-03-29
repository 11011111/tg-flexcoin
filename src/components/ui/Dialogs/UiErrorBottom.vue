<script setup lang="ts">
defineProps({
  error_title: String,
  error_message: String,
  media: String,
  modelValue: Boolean
})

defineEmits(['update:modelValue'])

const imgPath = process.env.DEFAULT_URL_PATH
</script>

<template lang="pug">
q-dialog(
  :model-value="modelValue"
  position="bottom"
)
  q-card.full-width.modern-dialog.q-py-sm.q-px-md
    q-card-section.no-padding
      .row.items-center.no-wrap
        .col(v-if="error_title")
          h2.text-center.q-pl-lg.q-pt-md {{ error_title }}
        .col-auto
          q-icon.q-pt-md(:name="`img:${imgPath}close.svg`" size="24px" @click="modelValue = !modelValue")
    q-card-section.q-pb-lg
      .row.justify-center
        p.text-center.q-px-sm.full-width(v-if="error_message") {{ error_message }}
        img.text-center.q-px-lg.q-mt-md.flex(v-if="media" :src="`${imgPath}${media}`")
    .row.justify-center.q-px-lg.q-pb-lg
      q-btn.button-text.btn-style.full-width(
        label="Ok"
        color="primary"
        @click="$emit('update:modelValue', false)"
        unelevated
        no-caps
      )
</template>

<style scoped lang="sass"></style>
