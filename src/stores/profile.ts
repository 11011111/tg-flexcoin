import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { apiLinks } from 'src/common/routerLinks'

export const profileState = defineStore('profileState', () => {
  const me = ref({})
  const calledPath = ref(null)
  const router = useRouter()
  const error = ref(null)
  const tg = window.Telegram.WebApp

  // Start
  const openWebApp = (initData: string) =>
    initData ? login(initData) : login(process.env.DEFAULT_DATA || '')

  //Add token
  const storeTokens = (token: UUID) => localStorage.setItem('access', token)
  //logout
  const logout = () => localStorage.removeItem('access')
  //Auth
  function login(iditData: string) {
    api
      .get(`${apiLinks.AUTH.list}?${iditData}`)
      .then((r) => {
        storeTokens(r.data.token) // write token
        tg.platform === 'unknown' // check platform for Web or TgApp
          ? alert(r.data.token)
          : tg.showAlert(r.data.token)
      })
      .catch((err) => console.log(err))
  }

  // Get Currency
  function getCurrency() {
    api
      .get(`${apiLinks.CURRENCIES.list}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    me,
    calledPath,
    error,

    login,
    storeTokens,
    logout,
    getCurrency,
    openWebApp
  }
})
