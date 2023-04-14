import React from 'react'
import LoginComponent from '../components/LoginComponent'
import { motion } from 'framer-motion';

function Login() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoginComponent />
    </motion.div>
  )
}

export default Login
