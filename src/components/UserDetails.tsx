import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUserDetails, currentUser } from '../redux/userslice'
import axios from 'axios'
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDetails() {
    const dispatch = useDispatch()
    const { email, username , id} = useSelector(currentUser)
    const [emailError, setEmailError] = useState('');

    const [user, setUser] = useState(username)
    const [userMail, setUserMail] = useState(email)
    const [edit, setEdit ] = useState(true)
    const [userId, setUserId ] = useState(id)

    useEffect(()=>{
        setUser(username)
        setUserMail(email)
        setUserId(userId)
    },[username, email, id])

    
    const validateEmail = () => {
        function validateEmail(userMail: string | null) {
            if(!userMail) return false
            const re = /\S+@\S+\.\S+/;
            return re.test(userMail);
        }
        console.log(validateEmail(userMail))
        if (!validateEmail(userMail)) {
            setEmailError("email must be a valid email address")
        } else {
            setEmailError('');
        }
    }
    
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
    
    const handleEdit = async() => {
        if(edit){
            setEdit(!edit)
        }else if(emailError.length === 0){
            try {
                const result = await axios.patch(`http://localhost:4000/user/update/${userId}`, { email:userMail, username:user }, { withCredentials: true })
                localStorage.setItem("email", result.data.email);
                localStorage.setItem("username", result.data.username);
                dispatch(addUserDetails({email:result.data.email, username:result.data.username, id: userId}))
            } catch (error: any) {
                console.log(error)
                notify(error.response.data.message)
            }
        }
    }
    return (
        <div className='w-1/3 min-h-[80vh] bg-gray-100 shadow-2xl flex justify-center items-center flex-col'>
            <div>
                <p className="text-center text-xl text-gray-500 font-light">
                    Welcome <br />
                    <span className='uppercase font-bold text-3xl'>{username}</span>
                </p>
            </div>
            <div className="mt-6">
                <div className="relative">
                    <input value={user ? user : ''} onChange={(e)=>setUser(e.target.value)} readOnly={edit} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="username" type="text" placeholder="Username" />
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
                        value={userMail ? userMail : ''}
                        onChange={(e) => setUserMail(e.target.value)} 
                        onBlur={validateEmail}
                        readOnly={edit}
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
                <div className="flex items-center justify-center mt-8">
                    <button onClick={handleEdit} className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                        {edit ? 'Edit' : 'Update'}
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

export default UserDetails
