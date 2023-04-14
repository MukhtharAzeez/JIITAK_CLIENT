import React from 'react'
import SignupComponent from '../components/SignupComponent'
import { motion } from 'framer-motion'


function Signup() {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <SignupComponent/>
    </motion.div>
  )
}

export default Signup
