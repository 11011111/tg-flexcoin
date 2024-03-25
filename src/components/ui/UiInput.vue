<template lang="pug">
.row.flex.column.full-width
  span.label-text.block.q-py-sm {{ label }}
  q-input(
    :model-value="modelValue"
    :placeholder="placeholder"
    @update:model-value="keyUpFn"
    type="number"
    debounce="300"
    outlined )
    template(v-slot:append )
      UiSelectModern(v-model="selectedValue" :options="options")

</template>

<script setup lang="ts">
import UiSelectModern from 'components/ui/UiSelectModern.vue'
import { computed } from 'vue'

const props = defineProps({
  label: String,
  modelValue: String,
  placeholder: String,
  options: [Array, Object],
  selectModel: {
    type: String,
    default: 'THB'
  }
})

const emit = defineEmits(['update:modelValue', 'selectModel'])
const keyUpFn = (evt: string) => emit('update:modelValue', evt)

const selectedValue = computed({
  get() {
    return props.selectModel
  },
  set(value) {
    console.log(value)
    emit('selectModel', value)
  }
})
</script>
