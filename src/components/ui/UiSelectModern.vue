<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const options = ref([
  { label: 'VND (Vietnam Dong)', denseLabel: 'VND', value: 0 },
  { label: 'IDR (Indonesian Rupiah)', denseLabel: 'IDR', value: 1 },
  { label: 'THB (Thai Baht)', denseLabel: 'THB', value: 2 },
  { label: 'USD (American Dollar)', denseLabel: 'USD', value: 3 },
  { label: 'TRY (Turkish Lira)', denseLabel: 'TRY', value: 4 }
])
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
  icon-right="img:/src/assets/img/unfold_more_horizontal.svg"
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
          h2.text-center Select the currency
        .col-auto
          q-icon.q-pb-md(name="bi-x" size="24px" @click="dialogWindow = !dialogWindow")
    q-card-section
      q-list(v-for="(currencyItem, idx) in options" :key="idx" dense)
        q-item.row.justify-between.no-padding(v-ripple)
          q-item-section.button-text.q-py-sm(
            @click="changeCurrency(currencyItem.denseLabel)"
            :class="currencyItem.denseLabel === modelValue ? 'text-primary' : 'color-currency-select'"
            ) {{ currencyItem.label }}
          q-item-section(v-if="currencyItem.denseLabel === modelValue" side)
            q-icon(name="bi-check2" color="primary")
//q-select(
//  behavior="dialog"
//  :model-value="modelValue"
//  :options="options"
//  @update:model-value="changeCurrency"
//  borderless
//)
//  template(v-slot:option)
//    h4  Select the currency
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
</style>
