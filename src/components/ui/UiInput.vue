<template lang="pug">
.row.flex.column.full-width
  span.label-text.block.q-py-sm {{ label }}
  q-input(
    :model-value="modelValue"
    :placeholder="placeholder"
    @update:model-value="keyUpFn"
    :suffix="suffix"
    outlined )
    template(v-slot:append v-if="haveAppendSelect" )
      q-select(
        behavior="dialog"
        :model-value="selectModel"
        :options="options"
        borderless
      )

</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  label: String,
  modelValue: String,
  placeholder: String,
  suffix: String,

  //отображение выпадающего списка справа
  haveAppendSelect: Boolean
})

const emit = defineEmits(['update:modelValue'])

const options = ref(['THB', 'USD', 'RUB'])
const selectModel = ref('THB')

const keyUpFn = (evt: string) => emit('update:modelValue', evt)
</script>

<style scoped lang="sass">
.label-text
  color: #979797
</style>
