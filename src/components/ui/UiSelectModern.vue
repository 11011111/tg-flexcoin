<script setup lang="ts">
import { ref } from 'vue'

defineProps({ modelValue: String, options: [Array, Object] })

const imgPath = process.env.DEFAULT_URL_PATH
const emit = defineEmits(['update:modelValue'])
const dialogWindow = ref(false)

// METHODS
function changeCurrency(currency: string) {
  emit('update:modelValue', currency)
  dialogWindow.value = !dialogWindow.value
}
// COMPUTED
</script>

<template lang="pug">
q-btn.modern-btn-select(
  :label="modelValue"
  :icon-right="`img:${imgPath}unfold_more_horizontal.svg`"
  @click="dialogWindow = !dialogWindow"
  unelevated
  flat
)
q-dialog(
  v-model="dialogWindow"
  position="bottom"
)
  q-card.full-width.modern-dialog.q-pa-sm
    q-card-section.no-padding
      .row.items-center.no-wrap
        .col
          h2.text-center.q-pt-md Select the currency
        .col-auto
          q-icon.q-pt-md(:name="`img:${imgPath}close.svg`" size="24px" @click="dialogWindow = !dialogWindow")
    q-card-section.q-pb-lg
      q-list(v-for="(currencyItem, idx) in options" :key="idx" dense)
        q-item.row.justify-between.no-padding(v-ripple)
          q-item-section.button-text.q-py-sm(
            @click="changeCurrency(currencyItem?.id)"
            :class="currencyItem?.id === modelValue ? 'text-primary' : 'color-currency-select'"
            ) {{ currencyItem.id }} ({{ currencyItem?.name }})
          q-item-section(v-if="currencyItem?.id === modelValue" side)
            q-icon(:name="`img:${imgPath}check.svg`" color="primary")
</template>

<style scoped lang="sass">
.modern-btn-select
  border-left: 1px solid $light-grey
  border-radius: 0
  font-weight: 700
  color: $dark
  padding-right: 0

.color-currency-select
  color: #aaaaaa

.btn-style
  border-radius: 10px !important
</style>
