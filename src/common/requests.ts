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
  console.log(requestData)
  return api.request({
    url:
      requestData.urlParam && requestData.link.retrieve
        ? requestData.link.retrieve(requestData.urlParam)
        : requestData.link.list,
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
export const currenciesRequest = (incomingData?: IIncomingData) =>
  request({ ...incomingData, link: apiLinks.CURRENCIES })

export const authRequest = (incomingData?: IIncomingData) =>
  request({ ...incomingData, link: apiLinks.AUTH })
