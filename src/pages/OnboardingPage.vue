<template lang="pug">
.row.full-width.justify-center.content-around(v-if="onboardingList.length" style="height: 100%")
  .row.full-width
    q-carousel.full-width(
      style="height: auto"
      v-model="slide"
      control-color="primary"
      transition-prev="jump-right"
      transition-next="jump-left"
      swipeable
    )
      q-carousel-slide( v-for="(url, idx) in bgs" :key="idx" :name="idx")
        UiSlide(
          :url-path="url"
        )
  .row.full-width
    q-carousel.full-width(
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
          :prevText="slide?.subtitle"
        )
    .row.wrap.q-px-lg.full-width
      .row.full-width.justify-center
        q-btn.button-text.btn-style(
          :label="slide+1 === onboardingList.length ? 'Start' : 'Next'"
          color="primary"
          @click="nextFn(slide)"
          no-caps
        )
      .row.full-width.justify-center
        UiProgressbarPacman.q-my-lg(
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
import { useQuasar, QSpinner } from 'quasar'

// import bg1 from 'https://flexcoin.sgp1.cdn.digitaloceanspaces.com/media/onboarding_one.svg'
// import bg2 from 'https://flexcoin.sgp1.cdn.digitaloceanspaces.com/media/onboarding_two.svg'
// import bg3 from 'https://flexcoin.sgp1.cdn.digitaloceanspaces.com/media/onboarding_three.svg'
// import bg4 from 'https://flexcoin.sgp1.cdn.digitaloceanspaces.com/media/onboarding_four.svg'
// import bg5 from 'https://flexcoin.sgp1.cdn.digitaloceanspaces.com/media/onboarding_five.svg'
// import bg6 from 'https://flexcoin.sgp1.cdn.digitaloceanspaces.com/media/onboarding_six.svg'

import bg1 from 'src/assets/bgOnboarding/onboarding_one.svg'
import bg2 from 'src/assets/bgOnboarding/onboarding_two.svg'
import bg3 from 'src/assets/bgOnboarding/onboarding_three.svg'
import bg4 from 'src/assets/bgOnboarding/onboarding_four.svg'
import bg5 from 'src/assets/bgOnboarding/onboarding_five.svg'
import bg6 from 'src/assets/bgOnboarding/onboarding_six.svg'

const bgs = [bg1, bg2, bg3, bg4, bg5, bg6]
const { getOnboardingSlides } = profileState()
const { onboardingList } = storeToRefs(profileState())
const slide = ref(0)
const router = useRouter()
const $q = useQuasar()

onBeforeMount(async () => {
  // await loader()
  await getOnboardingSlides()
})

// const loader = () => {
//   $q.loading.show({
//     spinner: QSpinner,
//     spinnerColor: 'grey'
//   })
// }

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

.btn-style
  width: 90%
</style>
