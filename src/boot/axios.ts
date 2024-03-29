import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { storeToRefs } from 'pinia'
import { settingsState } from 'stores/settings'

const { errorDialogBottom } = storeToRefs(settingsState())

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API_URL })

// Добавляем перехват запросов
api.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem('access')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Добавляем перехват ответов
api.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return Promise.resolve(response)
  },
  (error: AxiosError<any>) => {
    const { liveUpdate } = storeToRefs(settingsState())
    console.log(error.response)
    switch (error.response?.status) {
      case 400:
        errorDialogBottom.value = error.response.data
        break
      case 401:
        /*
         * В случае получения 401 ошибки в любом случае переадресовываем на страницу входа в приложение
         * */
        localStorage.removeItem('access')
        window.location.hash = '/'
        errorDialogBottom.value = error.response.data
        liveUpdate.value = false
        break
      case 403:
        errorDialogBottom.value = error.response.data
        break
      case 404:
        errorDialogBottom.value = error.response.data
        break
      case 422:
        errorDialogBottom.value = error.response.data
        break
      case 500:
        errorDialogBottom.value = error.response.data
        break
      case 502:
        errorDialogBottom.value = error.response.data
        break
      case undefined:
        console.error(error?.response?.data)
        break
      default:
        /*
         * На случай непредвиденных ошибок
         * */
        console.error(error?.response?.data)
      // Notify.create(error?.response?.data?.detail || 'Что-то пошло не так...')
    }

    return Promise.reject(error)
  }
)

export { api }
