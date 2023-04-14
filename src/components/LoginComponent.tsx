import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginComponent() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');

    const navigateToLoginPage = () => {
        navigate('/signup')
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

    return (
        <div className="min-h-[100vh] flex justify-center items-center">
            <div className="p-8 lg:w-1/3">
                <div className="bg-gray-100 rounded-md py-12 px-4 lg:px-24 shadow-xl">
                    <p className="text-center text-sm text-gray-500 font-light">
                        Sign in with credentials
                    </p>
                    <form className="mt-6">

                        <div className="relative mt-3">
                            <input
                                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="Email"
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
                        <div className="flex items-center justify-center mt-8">
                            <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-full ">
                    <p className="text-center text-sm text-gray-500 font-light py-4">
                        Don't have an account ? <span className="text-base text-gray-800 cursor-pointer" onClick={navigateToLoginPage}>Signup</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent
