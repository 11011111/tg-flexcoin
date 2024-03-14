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
      img.q-mr-sm(v-show="active" :style="'height: 10px; width: ' + activeImg.style +'px'" :src="activeImg.url" @click="onClick"  no-spinner)
      img.q-mr-sm(v-show="index >= (slide + 1)" :src="staticImg" @click="onClick" style="height: 10px; width: 10px" no-spinner)

</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import UiSlide from 'components/ui/UiSlide.vue'
import { profileState } from 'stores/profile'
import { storeToRefs } from 'pinia'
import { meRequest } from 'src/common/requests'
import { useRouter } from 'vue-router'
import { links } from 'src/common/routerLinks'

import active1 from 'src/assets/dots/active1.svg'
import active2 from 'src/assets/dots/active2.svg'
import active3 from 'src/assets/dots/active3.svg'
import active4 from 'src/assets/dots/active4.svg'
import active5 from 'src/assets/dots/active5.svg'
import active6 from 'src/assets/dots/active6.svg'
import staticImg from 'src/assets/dots/static.svg'

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
  const nameImg = [active1, active2, active3, active4, active5, active6]
  const dotsWidthPx = [10, 26, 42, 58, 74, 90]
  return {
    url: nameImg[slide.value],
    style: dotsWidthPx[slide.value]
  }
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
