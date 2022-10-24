import axios from 'axios'

export default axios.create({
  baseURL: process.env.REACT_APP_URL,
  // baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
})
