import api from '../api'

const getAllProducts = () => {
  return api.get('/product')
}

const getProductById = async (id) => {
  return await api.get(`/product/${id}`)
}

const addNewProduct = async (newProduct) => {
  return await api.post(`/product`, newProduct)
}

export { getAllProducts, getProductById, addNewProduct }
