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
         <Route path='/learn-more' element={<LearnMore />} />
         <Route path='/sustainability' element={<SustainabilityPage />} />
         <Route path='/spa-bookings' element={<SpaBookingPage />} />
         <Route path='/consultation' element={<ConsultationPage />} />
         <Route path='/reviews' element={<ReviewsPage />} />
         <Route path='/privacy' element={<PrivacyPolicy />} />
         <Route path='/terms' element={<TermsAndConditions />} />
         <Route path='/shipping' element={<ShippingInfo />} />
         
        </Routes>
        <Footer />
      
      </BrowserRouter>
    
    </>
  )
}
import TeeNaturalContact from './pages/Contact'
import LearnMore from './pages/LearnMore'
import SustainabilityPage from './pages/Sustainability'
import SpaBookingPage from './pages/SpaBookings'
import ConsultationPage from './pages/Consultations'
import ReviewsPage from './pages/Reviews'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import ShippingInfo from './pages/ShippingInfo'

export default App
