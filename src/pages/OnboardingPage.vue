<template lang="pug">
.flex.justify-center.items-center.full-width(style="height: 100vh" v-if="onboardingList.length" )
  q-carousel.flex.justify-center.items-center(

    style="height: auto"
    v-model="slide"
    control-color="primary"
    transition-prev="jump-right"
    transition-next="jump-left"
    animated
    swipeable
    navigation
  )
    q-carousel-slide( v-for="(slide, idx) in onboardList" :key="idx" :name="idx")
      UiSlide(
        :title="slide?.title"
        :urlPath="slide?.img_url"
        :prevText="slide?.subtitle"
      )
    template(v-slot:control)
      .full-width.q-px-lg
        .row.items-center.btn-mb
          q-btn.full-width.button-text.btn-style(
            :label="slide+1 === onboardingList.length ? 'Start' : 'Next'"
            color="primary"
            @click="nextFn(slide)"
            no-caps
          )
    template(v-slot:navigation-icon="{index, active, btnProps, onClick }")
      q-img.q-mr-sm(v-show="active" :src="activeImg" @click="onClick" :style="'height: 10px; width: ' + activeDots +'px'" no-spinner)
      q-img.q-mr-sm(v-show="index >= (slide + 1)"  src="dots/static.svg" @click="onClick" style="height: 10px; width: 10px" no-spinner)

</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import UiSlide from 'components/ui/UiSlide.vue'
import { profileState } from 'stores/profile'
import { storeToRefs } from 'pinia'
import { meRequest } from 'src/common/requests'
import { useRouter } from 'vue-router'
import { links } from 'src/common/routerLinks'

const { getOnboardingSlides } = profileState()
const { onboardingList } = storeToRefs(profileState())
const slide = ref(0)
const router = useRouter()

onBeforeMount(async () => {
  await getOnboardingSlides()
})

const onboardList = computed(() => {
  return onboardingList.value
})

const activeImg = computed(() => {
  return `dots/active${slide.value + 1}.svg` || 'dots/active1.svg'
})

const activeDots = computed(() => {
  const dotsWidthPx = [10, 26, 42, 58, 74, 90]
  return dotsWidthPx[slide.value]
})

const nextFn = (idx: number) => {
  if (idx + 1 !== onboardList.value.length) {
    slide.value += 1
  } else {
    meRequest({ method: 'patch', params: { skip_onboarding: true } })
      .then((r) => {
        router.push({ name: links.SCAN.name })
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
</script>

<style lang="sass">
.q-carousel__slides-container
  width: 100%
.btn-mb
  margin-bottom: 70px
</style>
