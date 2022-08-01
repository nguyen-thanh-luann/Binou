import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/header/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import ProductManager from './screens/admin/ProductManager'
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route path='/productManager' element={<ProductManager />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
