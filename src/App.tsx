import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Order } from './pages/Order'
import { Admin } from './pages/Admin'
import { NotFound } from './pages/NotFound'
import { PizzaPage } from './pages/PizzaPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/order' element={<Order />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/pizza/:pizzaId' element={<PizzaPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
