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
}

declare interface IRequestData extends IIncomingData {
  link: IApiRouteParams
}
