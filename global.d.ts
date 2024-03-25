// AXIOS
type AxiosPromise = import('axios').AxiosPromise
type AxiosResponse = () => import('axios').AxiosResponse
type Method = import('axios').Method

// Base types
declare type Integer = number
declare type Decimal = number
declare type UUID = string

// RouterLinksTypes
declare interface IRouteParams {
  path: string
  name: string
}

declare interface IApiRouteParams {
  list: string
  retrieve?: (id: UUID) => string
}

declare interface ILinks {
  [key: string]: IRouteParams
}

declare interface IApiLinks {
  [key: string]: IApiRouteParams
}

// requests
declare interface IMethods {
  [key: string]: Method
}

declare interface IIncomingData {
  params?: object
  method?: Method
  urlParam?: string
  charts?: boolean
  charts_list?: boolean
  reports?: boolean
  reports_list?: boolean
  aggregate_info?: boolean
  suffix?: string
  query?: string
}

declare interface IModelUser {
  id: UUID
  banned: boolean
  date_create: number
  first_name: string
  lang: string
  last_name: string
  last_online: number
  skip_onboarding: boolean
  username: string
}

declare interface IRequestData extends IIncomingData {
  link: IApiRouteParams
}

declare interface IModelCurrency {
  id: string
  name: string
}

declare interface IModelExchange {
  amount: number
  currency: string
  exchange_rate: number
}
