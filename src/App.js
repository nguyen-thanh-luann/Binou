import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import ProductManager from './screens/admin/ProductManager'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import UserInfoScreen from './screens/UserInfoScreen'
import CartScreen from './screens/CartScreen'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route path='/productManager' element={<ProductManager />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/signup' element={<SignupScreen />} />
        <Route path='/userInfo' element={<UserInfoScreen />} />
        <Route path='/cart' element={<CartScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
