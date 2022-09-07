import api from '../api'

const getAllProducts = () => {
  return api.get('/product')
}

const getProductByPage = (limit, page) => {
  return api.get(`/product?limit=${limit}&page=${page}`)
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

export {
  getAllProducts,
  getProductByPage,
  getProductById,
  addNewProduct,
  deleteProductById,
  updateProduct,
}
