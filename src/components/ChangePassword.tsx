import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { currentUser } from '../redux/userslice'
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const user = useSelector(currentUser)
    const [userId, setUserId ] = useState(user.id)
    const [error, setError] = useState('');


    const handlePasswordChange = async() => {
        if(oldPassword.length > 0 && newPassword.length > 0 ){
            try {
                console.log(userId)
                await axios.patch(`http://localhost:4000/user/updatePassword/${userId}`, { oldPassword, newPassword }, { withCredentials: true })
                setError('')
                toast.success('Password Changed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error: any) {
                console.log(error)
                setError(error.response.data.message)
            }
        }
    }


    return (
        <div className='w-1/3 min-h-[80vh] bg-gray-100 shadow-2xl flex justify-center items-center flex-col'>
            <div>
                <p className="text-center text-xl text-gray-500 font-light">
                    Change Password <br />
                    <span className='uppercase font-bold text-3xl'>{user.username}</span>
                </p>
            </div>
            <div className="mt-6">
                <div className="relative mt-3">
                    <input
                        className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Old Password"
                        onChange={(e)=>setOldPassword(e.target.value)}
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
                <div className="relative mt-3">
                    <input
                        className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
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
                <p className="text-center text-sm text-red-600 font-light mt-3">
                    {error}
                </p>
                <div className="flex items-center justify-center mt-8">
                    <button onClick={handlePasswordChange} className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                        Update
                    </button>
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

export default ChangePassword
