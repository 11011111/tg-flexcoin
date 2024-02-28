export const links: ILinks = {
  EXCHANGE: {
    path: 'exchange',
    name: 'exchange'
  }
}

export const apiLinks: IApiLinks = {
  AUTH: {
    list: '/bot/auth',
    retrieve: () => '/bot/auth'
  },
  CURRENCIES: {
    list: '/bot/available/currencies',
    retrieve: (id) => `/bot/available/currencies/${id}`
  }
}
