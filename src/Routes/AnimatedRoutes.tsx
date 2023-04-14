import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { AnimatePresence } from 'framer-motion';


function AnimatedRoutes() {

    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
