import api from '../api'

const login = (userData) => {
  return api.post(`/user/login`, userData)
}

const signup = (user) => {
  return api.post(`/user/signup`, user)
}

const update = (updateInfo) => {
  return api.put(
    `/user/update?id=${updateInfo.id}&name=${updateInfo.name}&password=${updateInfo.password}`
  )
}

export { login, signup, update }
