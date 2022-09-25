import api from '../api'

const getAllProducts = () => {
  return api.get('/product')
}

const getProductOnPage = (limit, page) => {
  return api.get(`/product?limit=${limit}&page=${page}`)
}

const getProductUseQuery = (query) => {
  return api.get(`/product?${query}`)
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

const updateProduct = async (id, updatePro) => {
  return await api.put(`/product/${id}`, updatePro)
}

const reviewProduct = async (id, data) => {
  return await api.post(`/product/${id}/review`, data)
}

export {
  getAllProducts,
  getProductOnPage,
  getProductById,
  addNewProduct,
  deleteProductById,
  updateProduct,
  getProductUseQuery,
  reviewProduct,
}
