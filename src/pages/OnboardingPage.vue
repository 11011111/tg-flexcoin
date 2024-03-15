<template lang="pug">
.flex.justify-center.items-center.full-width(style="height: 100vh" v-if="onboardingList.length" )
  q-carousel.flex.justify-center.items-center(

    style="height: auto"
    v-model="slide"
    control-color="primary"
    transition-prev="jump-right"
    transition-next="jump-left"
    swipeable
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
      UiProgressbarPacman.nav-position(
        :count-dots="onboardList.length"
        :activeIndex="slide"
      )

</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import UiSlide from 'components/ui/UiSlide.vue'
import { profileState } from 'stores/profile'
import { storeToRefs } from 'pinia'
import { meRequest } from 'src/common/requests'
import { useRouter } from 'vue-router'
import { links } from 'src/common/routerLinks'
import UiProgressbarPacman from 'components/ui/UiProgressbarPacman.vue'

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
  margin-bottom: 60px
.nav-position
  margin-top: -80px
</style>
