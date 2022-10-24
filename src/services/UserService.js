import api from '../api'

const login = (userData) => {
  return api.post(`/user/login`, userData)
}

const signup = (user) => {
  return api.post(`/user/signup`, user)
}

const addWishlist = (id, productId) => {
  return api.put(`/user/addWishlist?userId=${id}&productId=${productId}`)
}

const removeWishlist = (id, productId) => {
  return api.put(`/user/removeWishlist?userId=${id}&productId=${productId}`)
}

const update = (updateInfo) => {
  return api.put(
    `/user/update?id=${updateInfo.id}&name=${updateInfo.name}&password=${updateInfo.password}
    &phone=${updateInfo.phone}&address=${updateInfo.address}`
  )
}

export { login, signup, update, addWishlist, removeWishlist }
