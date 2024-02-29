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

  //Auth
  function login(iditData: string) {
    api
      .get(`${apiLinks.AUTH.list}?${iditData}`)
      .then((r) => {
        storeTokens(r.data.token)
        tg.showAlert(r.data)
      })
      .catch((err) => console.log(err))
  }

  //Add token
  function storeTokens(token: UUID) {
    localStorage.setItem('access', token)
  }

  //logout
  function logout() {
    localStorage.removeItem('access')
    // void router.push({ name: 'login-page' })
  }

  return {
    me,
    calledPath,
    error,

    login,
    storeTokens,
    logout
  }
})
