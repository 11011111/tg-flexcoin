<script setup lang="ts">
defineProps({
  colorActive: {
    type: String,
    default: '#376AEF'
  },
  colorStatic: {
    type: String,
    default: '#95AFF1'
  },
  countDots: Number,
  activeIndex: Number
})
</script>

<template lang="pug">
.stepper
  div.breadcrumb
    div.li(v-for="(dot, idx) in countDots" :key="idx" :style="activeIndex === 0 ? 'border-radius: 50% !important; width: 10px; height: 10px; margin: 0 3px' : ''" :class="idx <= activeIndex ? 'active': ''")
</template>

<style lang="sass">
.breadcrumb
  margin: 0
  padding: 0
  height: 10px
  display: flex
  justify-content: center
  align-items: center
  align-content: center

  & > .li
    background: v-bind(colorStatic)
    border: none

  & > .li, .only-active
    margin: 0 3px
    position: relative
    cursor: pointer
    flex: auto
    border-radius: 50px
    width: 10px
    height: 10px


  & > .li.active
    background: v-bind(colorActive)

  & > .li.active:first-child
    border-radius: 50px 0 0 50px
    margin-right: 0
    margin-left: 3px !important
    width: 13px

  & > .li.active:nth-last-child(1 of .active)
    border-radius: 0 50px 50px 0 !important
    margin-left: 0
    margin-right: 3px !important
    width: 13px

  & > .li.active:not(:first-child):not(:last-child)
    border-radius: 0
    margin-left: 0 !important
    margin-right: 0 !important
    width: 16px
</style>
