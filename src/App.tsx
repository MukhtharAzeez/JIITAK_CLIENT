import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import AnimatedRoutes from './Routes/AnimatedRoutes';
import Home from './pages/Home';
import UpdateProfile from './pages/UpdateProfile';


function App() {

  return (
    <div className="App">
      <Router>
        <AnimatedRoutes/>
        <Routes>
          <Route path='' element={<Home/>}></Route>
          <Route path='/update-profile' element={<UpdateProfile/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
