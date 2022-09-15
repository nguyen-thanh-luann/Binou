import axios from 'axios'
// https://imthanhluan-clothes-api.vercel.app
// http://localhost:5000
export default axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
})
