import axios from 'axios'
// https://ntl-clothes-api.herokuapp.com
//http://localhost:5000
export default axios.create({
  baseURL: 'https://ntl-clothes-api.herokuapp.com/api',
  headers: { 'Content-Type': 'application/json' },
})
