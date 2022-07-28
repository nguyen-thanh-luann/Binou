import api from '../api'

const getAllProducts = () => {
  return api.get('/product')
}

const getProductById = async (id) => {
  return await api.get(`/product/${id}`)
}

export { getAllProducts, getProductById }
