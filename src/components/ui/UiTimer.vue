<script setup lang="ts">
import { computed, ref } from 'vue'
import { remainingTimeFn } from 'src/common/utils'

const props = defineProps({
  unixTime: {
    type: Number,
    required: true
  }
})

const remainingTime = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const timer = ref(null)

const mountTimer = () => {
  remainingTime.value = remainingTimeFn(props.unixTime)
  updateTimer()
  timer.value = setInterval(updateTimer, 1000)
}

const updateTimer = () => {
  if (remainingTime.value > 0) {
    minutes.value = Math.floor(remainingTime.value / 60)
    seconds.value = remainingTime.value % 60
    remainingTime.value--
  } else {
    clearInterval(timer.value)
    minutes.value = 0
    seconds.value = 0
  }
}

const formattedMinutes = computed(() => {
  return minutes.value.toString().padStart(2, '0')
})
const formattedSeconds = computed(() => {
  return seconds.value.toString().padStart(2, '0')
})

mountTimer()
</script>

<template lang="pug">
span {{ formattedMinutes }}:{{ formattedSeconds }}
</template>

<style scoped lang="sass"></style>
