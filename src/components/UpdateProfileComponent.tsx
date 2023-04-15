import React, { useState } from 'react'
import UserDetails from './UserDetails';
import ChangePassword from './ChangePassword';

function UpdateProfileComponent() {
    const [toggle, setToggle] = useState('Profile')

    return (
        <div className='min-h-[100vh] w-full flex justify-evenly items-center pt-24'>
            <div className='w-1/3 min-h-[80vh] flex flex-col justify-between items-center gap-4'>
                <div onClick={() => setToggle('Profile')} className={`${toggle === 'Profile' ? 'bg-gray-200' : 'bg-gray-100'} h-96 rounded-lg shadow-2xl flex justify-center items-center cursor-pointer w-full`}>
                    <p className="text-center text-4xl text-gray-500 font-light">
                        Profile
                    </p>
                </div>
                <div onClick={() => setToggle('Password')} className={`${toggle === 'Password' ? 'bg-gray-200' : 'bg-gray-100'} h-96 rounded-lg shadow-2xl flex justify-center items-center cursor-pointer w-full`}>
                    <p className="text-center text-4xl text-gray-500 font-light">
                        Change Password
                    </p>
                </div>
            </div>
            {toggle === 'Profile' && <UserDetails />}
            {toggle === 'Password' && <ChangePassword />}
        </div>
    )
}
export default UpdateProfileComponent
