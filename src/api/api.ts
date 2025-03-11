import axios from 'axios'

export const API_URL = localStorage.getItem('apiUrl') + '/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// TODO: удалить
// Добавление JWT токена для авторизации
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('authToken')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })
