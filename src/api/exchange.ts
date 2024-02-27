import api from 'src/api/axios'

const sendCurrencies = (data: object) => {
  const params = data
  return api.get('/api/v1/bot/available/currencies', {params})
}


export default {
  sendCurrencies
}
