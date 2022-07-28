import api from '../api'

const getAllProducts = () => {
  return api.get('/product')
}

export { getAllProducts }
