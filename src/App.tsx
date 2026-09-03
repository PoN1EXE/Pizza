import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Order } from './pages/Order'
import { Admin } from './pages/Admin'
import { NotFound } from './pages/NotFound'
import { PizzaPage } from './pages/PizzaPage'
import { Header } from './components/Header/Header'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Routes>
        <Route path='/' element={<Home searchQuery={searchQuery} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/order' element={<Order />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/pizza/:id' element={<PizzaPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
