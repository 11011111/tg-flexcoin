<script setup lang="ts">
import { ref } from 'vue'

const isCheck = ref(false)
const imgPath = process.env.DEFAULT_URL_PATH
defineProps({
  title: String,
  desc: String,
  modelValue: Boolean
})
defineEmits(['update:modelValue'])
</script>

<template lang="pug">
q-dialog(
  :model-value="modelValue"
  position="bottom"
)
  q-card.full-width.modern-dialog.q-py-sm.q-px-md
    q-card-section.no-padding
      .row.items-center.no-wrap
        .col(v-if="title")
          h2.text-center.q-pl-lg.q-pt-md {{ title }}
        .col-auto
          q-icon.q-pt-md(:name="`img:${imgPath}close.svg`" size="24px" @click="$emit('update:modelValue', false)")
    q-card-section.q-pb-lg
      .row.justify-center
        q-radio(v-model="isCheck" val="confirm" :label="desc")
    .q-px-lg.q-pb-lg.full-width.flex
      q-btn.button-text.btn-style.q-mr-sm(
        style="flex: 1"
        label="Cancel"
        color="primary"
        @click="$emit('update:modelValue', false)"
        unelevated
        no-caps
        outline
      )
      q-btn.button-text.btn-style.q-ml-sm(
        style="flex: 1"
        label="Confirm"
        color="primary"
        :disable="!isCheck"
        unelevated
        no-caps
      )
</template>

<style scoped lang="sass"></style>
