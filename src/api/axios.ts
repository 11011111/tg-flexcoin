import axios from 'axios'
// import store from '/src/store/module-startPage/index'

const api = axios.create({ baseURL: 'https://9981-103-105-213-17.ngrok-free.app/' })

// api.interceptors.request.use(function (config) {
//   const ref_id = localStorage.getItem('ref_id')
//
//   // let ref_id = store.getters['startPage/getRefId']
//
//   // while (!ref_id) {
//   //   setTimeout()
//   //   ref_id = store.getters['startPage/getRefId']
//   //   console.log(ref_id, 'AXIOS')
//   // }
//   if (ref_id) {
//     config.headers.Authorization = `${ref_id}`
//   }
//   return config
// })

export default api
