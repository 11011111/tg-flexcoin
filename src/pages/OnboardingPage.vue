<template lang="pug">
q-card.flex.justify-center.items-end.full-width(style="height: 100vh")
  q-carousel.flex.justify-center.items-center.full-width(
    style="height: auto"
    v-model="slide"
    control-color="primary"
    swipeable
    navigation
  )
    q-carousel-slide( v-for="(slide, idx) in onboardingList" :key="idx" :name="idx")
      UiSlide(
        :title="slide?.title"
        :urlPath="slide?.img_url"
        :prevText="slide?.subtitle"
      )
      .row.q-py-lg.q-mb-lg.items-center
        q-btn.full-width.button-text.btn-style(
          :label="idx+1 === onboardingList.length ? 'Start' : 'Next'"
          color="primary"
          @click="nextFn(idx)"
          no-caps
        )
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
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

const nextFn = (idx: number) => {
  if (idx + 1 !== onboardingList.value.length) {
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
</style>
