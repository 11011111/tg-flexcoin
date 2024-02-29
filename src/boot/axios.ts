import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { storeToRefs } from 'pinia'
import { Notify } from 'quasar'
import { settingsState } from 'stores/settings'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API_URL })

api.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

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

    switch (error.response?.status) {
      case 400:
        return Promise.reject(error)
      case 401:
        /*
         * В случае получения 401 ошибки в любом случае переадресовываем на страницу входа в приложение
         * */
        localStorage.removeItem('access')
        window.location.hash = '/'
        Notify.create('Не авторизован')
        liveUpdate.value = false
        break
      case 403:
        Notify.create('Недостаточно прав доступа')
        break
      case 404:
        Notify.create(error?.response?.data?.detail || 'Объект не найден')
        break
      case 422:
        Notify.create(
          error?.response?.data?.detail ||
            'Запрос корректный, но нет возможности обработать!'
        )
        break
      case 500:
        console.error(error?.response?.data)
        Notify.create(error?.response?.data?.detail || 'Ошибка сервера')
        break
      case 502:
      case undefined:
        Notify.create('Сервис временно недоступен')
        break
      default:
        /*
         * На случай непредвиденных ошибок
         * */
        console.error(error?.response?.data)
        Notify.create(error?.response?.data?.detail || 'Что-то пошло не так...')
    }

    return Promise.reject(error)
  }
)

export { api }
