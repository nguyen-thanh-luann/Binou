import axios from 'axios'
// https://imthanhluan-clothes-api.vercel.app/api
// http://localhost:5000
export default axios.create({
  baseURL: 'https://imthanhluan-clothes-api.vercel.app/api',
  headers: { 'Content-Type': 'application/json' },
})
