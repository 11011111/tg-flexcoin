import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { authRequest, meRequest, onboardingRequest } from 'src/common/requests'
import { links } from 'src/common/routerLinks'

export const profileState = defineStore('profileState', () => {
  const me = ref<IModelUser>()
  const calledPath = ref(null)
  const router = useRouter()
  const error = ref(null)
  const tg = window.Telegram.WebApp
  const onboardingList = ref([])

  // Start
  const openWebApp = (initData: string) => {
    initData ? login(initData) : login(process.env.DEFAULT_DATA || '')
  }

  //Add token
  const storeTokens = (token: UUID) => localStorage.setItem('access', token)

  //logout
  const logout = () => localStorage.removeItem('access')

  //Auth
  async function login(iditData: string) {
    await authRequest({ query: iditData })
      .then((r) => {
        storeTokens(r.data.token) // write token
        // tg.platform === 'unknown' // check platform for Web or TgApp
        //   ? console.log(r.data.token)
        //   : tg.showAlert(r.data.token)
        getMe()
      })
      .catch((err) => console.log(err))
  }

  //Get Slides Onboarding
  async function getOnboardingSlides() {
    await onboardingRequest()
      .then((r) => {
        onboardingList.value = r.data.items
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async function getMe() {
    await meRequest()
      .then((r) => {
        me.value = r.data.user
        checkOnboarding(r.data.user.skip_onboarding)
      })
      .catch((e) => console.log(e))
  }

  // Если Onboarding пройден - редирект в приложения, иначе на Onboarding
  async function checkOnboarding(skip_onboarding: boolean) {
    if (skip_onboarding) {
      await router.push({ name: links.SCAN.name })
    } else {
      await router.push({ name: links.ONBOARDING.name })
    }
  }

  return {
    me,
    calledPath,
    error,
    onboardingList,

    login,
    storeTokens,
    logout,
    openWebApp,
    getOnboardingSlides,
    getMe,
    checkOnboarding
  }
})
