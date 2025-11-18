import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Footer from './components/Footer'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import TeeNaturalProductsWithProvider from './pages/Products'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'
import TeeNaturalAbout from './pages/About'
import NotFound from './pages/NotFound'
function App() {
  

  return (
    <>
      <BrowserRouter>
      
      <Navbar />
        <Routes>
         <Route path='/' element={< Home/>} />
         <Route path='/products' element={< TeeNaturalProductsWithProvider />} />
         <Route path='/cart' element={<Cart />} />
         <Route path='/about' element={<TeeNaturalAbout />} />
         <Route path='/contact' element={<TeeNaturalContact />} />
         <Route path="*" element={<NotFound />} />

        </Routes>
        <Footer />
      
      </BrowserRouter>
    
    </>
  )
}
import TeeNaturalContact from './pages/Contact'

export default App
