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

const deleteProductById = async (id) => {
  return await api.delete(`/product/${id}`)
}

export { getAllProducts, getProductById, addNewProduct, deleteProductById }
