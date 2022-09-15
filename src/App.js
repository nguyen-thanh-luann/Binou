import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

import ProductManager from './screens/admin/ProductManager'
import CategoryManager from './screens/admin/CategoryManager'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import UserInfoScreen from './screens/UserInfoScreen'
import CartScreen from './screens/CartScreen'
import SearchScreen from './screens/SearchScreen'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/signup' element={<SignupScreen />} />
        <Route path='/cart' element={<CartScreen />} />
        <Route path='/search' element={<SearchScreen />} />
        <Route
          path='/productManager'
          element={
            <AdminRoute>
              <ProductManager />
            </AdminRoute>
          }
        />
        <Route
          path='/categoryManager'
          element={
            <AdminRoute>
              <CategoryManager />
            </AdminRoute>
          }
        />
        <Route
          path='/userInfo'
          element={
            <ProtectedRoute>
              <UserInfoScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
