import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import AnimatedRoutes from './Routes/AnimatedRoutes';
import Home from './pages/Home';
import UpdateProfile from './pages/UpdateProfile';
import ForgotPassword from './pages/ForgotPassword';


function App() {

  return (
    <div className="App">
      <Router>
        <AnimatedRoutes/>
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
