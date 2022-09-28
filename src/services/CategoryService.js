import api from '../api'

const getAllCategory = () => {
  return api.get('/category')
}

export { getAllCategory }
