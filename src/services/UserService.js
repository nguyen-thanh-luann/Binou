import api from '../api'

const login = (userData) => {
  return api.post(`/user/login`, userData)
}

export { login }
