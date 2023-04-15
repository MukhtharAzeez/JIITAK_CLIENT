import React, { useEffect } from 'react'
import UpdateProfileComponent from '../components/UpdateProfileComponent'
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addUserDetails, currentUser } from '../redux/userslice';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const { email } = useSelector(currentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!email) {
      const email = localStorage.getItem('email')
      if (email) {
        const username = localStorage.getItem('username')
        dispatch(addUserDetails({email, username}))
      }else{
        navigate('/login')
      }
    }
  }, [])

  return (
    <>
      <Navbar/>
      <UpdateProfileComponent/>
    </>
  )
}

export default UpdateProfile
