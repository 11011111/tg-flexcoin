import api from 'src/api/axios'

const sendCurrencies = (data: object) => {
  const params = data
  return api.get('/api/v1/bot/available/currencies', {params})
}

const getAuth = (data: object) => {
  return api.get('/api/v1/bot/auth?' + data)
}


export default {
  sendCurrencies,
  getAuth
}
