import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/header/Header'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <HomeScreen />
    </BrowserRouter>
  )
}

export default App
