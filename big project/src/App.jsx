import { useState } from 'react'
import './App.css'
import Navbar from './compontes/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/Cart/Cart'
import PlasceOrder from './pages/PlasceOrder/PlasceOrder'
import Footer from './compontes/Footer/Footer'
import LoginPopup from './compontes/LoginPopup/LoginPopup'

function App() {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
       <div className='app'>
         <Navbar setShowLogin={setShowLogin}/>
         <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlasceOrder/>}/>
         </Routes>
       </div>
       <Footer/>
    </>
  )
}

export default App
