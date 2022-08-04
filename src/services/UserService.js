import api from '../api'

const login = (userData) => {
  return api.post(`/user/login`, userData)
}

const signup = (user) => {
  return api.post(`/user/signup`, user)
}

export { login, signup }
