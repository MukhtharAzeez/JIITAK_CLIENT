import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails, currentUser } from '../redux/userslice';

function SignupComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector(currentUser)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordType, setPasswordType] = useState('');

  useEffect(() => {
    if (token) {
      navigate('/update-profile')
    } else {
      const token = localStorage.getItem('token')
      if (token) {
        dispatch(addUserDetails(token))
        navigate('/update-profile')
      }
    }
  }, [])

  const notify = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const navigateToLoginPage = () => {
    navigate('/login')
  }

  const validateEmail = () => {
    function validateEmail(email: string) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    if (email.length == 0) return setEmailError('')

    if (!validateEmail(email)) {
      setEmailError("email must be a valid email address")
    } else {
      setEmailError('');
    }
  }

  const validatePassword = (e: any) => {
    setPassword(e.target.value)
    function checkPasswordStrong(password: string) {
      const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return strong.test(password)
    }
    if (checkPasswordStrong(e.target.value)) {
      setPasswordType("Strong");
    } else {
      setPasswordType("Not Strong");
    }

  }

  const handleSignup = async () => {
    if (username.length === 0 || email.length === 0 || password.length === 0) {
      notify('All fields are required')
      return
    }
    try {
      const result = await axios.post('http://localhost:4000/user/signup', { username, email, password }, { withCredentials: true })
      localStorage.setItem("token", result.data.email)
      dispatch(addUserDetails(result.data.email))
    } catch (error: any) {
      notify(error.response.data.message)
    }
  }

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <div className="p-8 lg:w-1/3">
        <div className="bg-gray-100 rounded-md py-12 px-4 lg:px-24 shadow-xl">
          <p className="text-center text-sm text-gray-500 font-light">
            Sign up with credentials
          </p>
          <div className="mt-6">
            <div className="relative">
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="username" type="text" placeholder="Username" />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 ml-3 text-gray-400 p-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
            </div>

            <div className="relative mt-3">
              <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>

              </div>
            </div>
            <p className="text-center text-sm text-red-600 font-light mt-3">
              {emailError}
            </p>

            <div className="relative mt-3">
              <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={validatePassword}
                onBlur={() => {
                  password.length === 0 && setPasswordType('')
                }}
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
              </div>
            </div>
            {passwordType.length > 0 &&
              <p className="mt-4 italic text-gray-500 font-light text-xs">Password strength: <span className={`font-bold ${passwordType === 'Strong' ? 'text-green-400' : 'text-red-400'} `}>{passwordType}</span> {passwordType === 'Not Strong' && 'Include digits, numbers, uppercase, lowercase and minimum length is 8'} </p>
            }
            <div className="flex items-center justify-center mt-8">
              <button onClick={handleSignup} className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transdiv hover:-translate-y-0.5">
                Sign in
              </button>
            </div>
          </div>
        </div>

        <div className="w-full ">
          <p className="text-center text-sm text-gray-500 font-light py-4">
            Already have an account ? <span className="text-base text-gray-800 cursor-pointer" onClick={navigateToLoginPage}>Login</span>
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={4}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />

    </div>
  );
}

export default SignupComponent;
