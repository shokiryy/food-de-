import React from 'react'
import Navbar from './componets/Navbar/Navbar'
import Sidebar from './componets/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Oreder from './pages/Orders/Oreder'
import { ToastContainer} from 'react-toastify';
const App = () => {
  const url =  "http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
       <Navbar/>
       <hr />
       <div className="app-content">
        <Sidebar/>
        <Routes>
           <Route path='/add' element={<Add url={url}/>}/>
           <Route path='/list' element={<List  url={url}/>}/>
           <Route path='/orders' element={<Oreder  url={url}/>}/>

        </Routes>
       </div>
    </div>
  )
}

export default App