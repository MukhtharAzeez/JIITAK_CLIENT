import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPasswordComponent() {
    const [email,setEmail] = useState('')
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [otp, setOtp ] = useState('')
    const [sendedOtp, setSendedOtp ] = useState('')
    const [otpInputReadonly, setOtpInputReadonly] = useState(true)
    const [changePasswordInputReadonly, setChangePasswordInputReadonly] = useState(true)
    const [newPassword, setNewPassword] = useState('')


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

    const handleSubmitOtpOrEmail = async() => {
        if(emailError === '' && email.length > 0 && otpInputReadonly) {
            try {
                const result = await axios.post('http://localhost:4000/user/email', { email }, { withCredentials: true })
                if(result.data === false){
                    toast.error("Make sure you have an account", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    return 
                }
                setSendedOtp(result.data)
                setOtpInputReadonly(false)
            } catch (error: any) {
                toast.error(error.response.data.message, {
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
        }
        if(!otpInputReadonly){
            console.log(parseInt(otp) , parseInt(sendedOtp));
            
            if(parseInt(otp) === parseInt(sendedOtp)){
                setChangePasswordInputReadonly(false)
            }else{
                toast.error("OTP is not matching", {
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
        }
    }

    const handleChangePassword = async () => {
        if(!changePasswordInputReadonly){
            if(newPassword.length === 0) {
                setPasswordError("Password is required")
            }else {
                try {
                    const result = await axios.patch('http://localhost:4000/user/forgotPassword', { email, newPassword }, { withCredentials: true })
                    toast.success('Password updated', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate('/login')
                } catch (error: any) {
                    toast.error(error.response.data.message, {
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
            }
        }
    }

    const navigate = useNavigate()
    return (
        <div className='flex items-center min-h-[100vh] justify-around'>
            <div className='w-1/3 min-h-[80vh] bg-gray-100 shadow-2xl flex justify-center items-center flex-col'>
                <div>
                    <p className="text-center text-xl text-gray-500 font-light">
                        Enter your email address
                    </p>
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
                        className={`${otpInputReadonly && 'cursor-not-allowed'} appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline`}
                        id="otp"
                        type="text"
                        placeholder="Enter OTP"
                        readOnly={otpInputReadonly}
                        value={otp}
                        onChange={(e)=>setOtp(e.target.value)}
                    />
                </div>
                <div className=" flex items-center justify-center mt-8">
                    {
                        changePasswordInputReadonly && 
                        <button onClick={handleSubmitOtpOrEmail} className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                            {otpInputReadonly ? 'Submit' : 'Verify'}
                        </button>
                    }
                    {
                        !changePasswordInputReadonly && 
                        <button  className="text-white py-2 px-4 uppercase rounded bg-green-500 hover:bg-green-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                            Verified
                        </button>
                    }
                </div>
                <div>
                    <p className="text-center text-sm text-gray-500 font-light py-4 flex flex-col">
                        <div>Go back to  <span className="text-base text-gray-800 cursor-pointer" onClick={()=>navigate('/login')}>Login</span></div>
                    </p>
                </div>
            </div>

            <div className='w-1/3 min-h-[80vh] bg-gray-100 shadow-2xl flex justify-center items-center flex-col'>
                <div>
                    <p className="text-center text-xl text-gray-500 font-light">
                        {
                            changePasswordInputReadonly ? 
                            'Verify your Email' : 
                            'Now You can change your password'
                        }
                        {/* <span className='uppercase font-bold text-3xl'>Mukhthar Azeez</span> */}
                    </p>
                </div>

                <div className="mt-6">
                    <div className="relative mt-3">
                        <input
                            className={`${changePasswordInputReadonly && 'cursor-not-allowed'}cursor-not-allowed appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline`}
                            id="password"
                            type="password"
                            placeholder="New Password"
                            readOnly={changePasswordInputReadonly}
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
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
                    <div className=" flex items-center justify-center mt-8">
                        <button onClick={handleChangePassword} className={`${changePasswordInputReadonly ? 'cursor-not-allowed' : ''}cursor-not-allowed text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5`}>
                            Update
                        </button>
                    </div>
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
    )
}

export default ForgotPasswordComponent
