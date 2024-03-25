export const links: ILinks = {
  EXCHANGE: {
    path: 'exchange',
    name: 'exchange'
  },
  ONBOARDING: {
    path: 'onboarding',
    name: 'onboarding'
  },
  SCAN: {
    path: 'scan',
    name: 'scan'
  }
}

export const apiLinks: IApiLinks = {
  AUTH: {
    list: '/bot/auth',
    retrieve: () => '/bot/auth'
  },
  ME: {
    list: '/bot/me'
  },
  CURRENCIES: {
    list: '/bot/available/currencies',
    retrieve: (id) => `/bot/available/currencies/${id}`
  },
  ONBOARDING: {
    list: '/bot/onboarding',
    retrieve: (id) => `/bot/onboarding/${id}`
  },
  QR: {
    list: '/bot/scan/qr'
  },
  PRICE: {
    list: '/bot/exchange/price'
  }
}
