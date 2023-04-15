import React, { useEffect } from 'react'
import UpdateProfileComponent from '../components/UpdateProfileComponent'
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addUserDetails, currentUser } from '../redux/userslice';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const { token } = useSelector(currentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {
      const token = localStorage.getItem('token')
      if (token) {
        dispatch(addUserDetails(token))
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
