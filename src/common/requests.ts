import { api } from 'boot/axios'
import { apiLinks } from 'src/common/routerLinks'

import type { AxiosPromise } from 'axios'

export const methods: IMethods = {
  get: 'get',
  post: 'post',
  patch: 'patch',
  put: 'put',
  delete: 'delete'
}

const request = (requestData: IRequestData): AxiosPromise => {
  return api.request({
    url:
      requestData.urlParam && requestData.link.retrieve
        ? requestData.link.retrieve(requestData.urlParam)
        : `${requestData.link.list}${
            requestData.query ? `?${requestData.query}` : '' // add check ?query params
          }`,
    method: requestData.method || methods.get,
    data:
      // POST PUT PATCH DELETE
      requestData.method !== methods.get
        ? { ...requestData.params }
        : undefined,
    params:
      // GET
      !requestData.method || requestData.method === methods.get
        ? { ...requestData.params }
        : undefined
  })
}

/**
 * Создание набора предзаполненных реквестов
 */
// Получить список валют
export const currenciesRequest = (incomingData?: IIncomingData) =>
  request({ ...incomingData, link: apiLinks.CURRENCIES })
// Авторизоваться
export const authRequest = (incomingData?: IIncomingData) =>
  request({ ...incomingData, link: apiLinks.AUTH })
// Получить Onboarding
export const onboardingRequest = (incomingData?: IIncomingData) =>
  request({ ...incomingData, link: apiLinks.ONBOARDING })
// Получить Me
export const meRequest = (incomingData?: IIncomingData) =>
  request({ ...incomingData, link: apiLinks.ME })
// Получить Me
export const QRRequest = (incomingData?: IIncomingData) =>
  request({ ...incomingData, link: apiLinks.QR })
