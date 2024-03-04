<script setup lang="ts">
import { ref } from 'vue'

defineProps({ modelValue: String, options: [Array, Object] })

const emit = defineEmits(['update:modelValue'])
const dialogWindow = ref(false)

// METHODS
function changeCurrency(currency: string) {
  emit('update:modelValue', currency)
}
// COMPUTED
</script>

<template lang="pug">
q-btn.modern-btn-select(
  :label="modelValue"
  icon-right="img:~assets/img/unfold_more_horizontal.svg"
  @click="dialogWindow = true"
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
          h2.text-center.text-dark Select the currency
        .col-auto
          q-icon.q-pb-md(name="bi-x" size="24px" @click="dialogWindow = !dialogWindow")
    q-card-section
      q-list(v-for="(currencyItem, idx) in options" :key="idx" dense)
        q-item.row.justify-between.no-padding(v-ripple)
          q-item-section.button-text.q-py-sm(
            @click="changeCurrency(currencyItem?.id)"
            :class="currencyItem?.id === modelValue ? 'text-primary' : 'color-currency-select'"
            ) {{ currencyItem.id }} ({{ currencyItem?.name }})
          q-item-section(v-if="currencyItem?.id === modelValue" side)
            q-icon(name="bi-check2" color="primary")
    q-card-section
      q-btn.full-width.button-text.btn-style(
        label="Ok"
        color="primary"
        @click="dialogWindow = !dialogWindow"
        no-caps
      )
</template>

<style scoped lang="sass">
.modern-btn-select
  border-left: 1px solid $light-gray
  border-radius: 0
  font-weight: 700
  color: $dark
  padding-right: 0

.modern-dialog
  border-radius: 10px 10px 0 0

.color-currency-select
  color: #aaaaaa

.btn-style
  border-radius: 10px
</style>
